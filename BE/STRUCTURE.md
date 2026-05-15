# HAT Studio Backend - Modular Architecture

## ✅ ĐÃ HOÀN THÀNH REFCTOR

Backend đã được refactor thành công theo kiến trúc modular! Server đang chạy tại: **http://localhost:8080**

## 📁 Cấu trúc thư mục (HOÀN CHỈNH)

```
BE/src/
├── config/                 # Cấu hình ứng dụng
│   ├── app.ts              # Middleware & routes setup
│   └── cors.ts             # CORS settings
│
├── modules/                # Feature modules (tự chứa)
│   ├── auth/
│   │   ├── auth.controller.ts   # ✅ Request handlers
│   │   ├── auth.service.ts      # ✅ Business logic
│   │   ├── auth.routes.ts       # ✅ Express routes
│   │   ├── auth.validation.ts   # ✅ Zod schemas
│   │   └── auth.types.ts        # ✅ TypeScript types
│   │
│   ├── project/
│   │   ├── project.controller.ts   # ✅
│   │   ├── project.service.ts      # ✅
│   │   ├── project.routes.ts       # ✅
│   │   ├── project.validation.ts   # ✅
│   │   └── project.types.ts        # ✅
│   │
│   ├── service/
│   │   ├── service.controller.ts   # ✅
│   │   ├── service.service.ts      # ✅
│   │   ├── service.routes.ts       # ✅
│   │   ├── service.validation.ts   # ✅
│   │   └── service.types.ts        # ✅
│   │
│   ├── testimonial/
│   │   ├── testimonial.controller.ts   # ✅
│   │   ├── testimonial.service.ts      # ✅
│   │   ├── testimonial.routes.ts       # ✅
│   │   ├── testimonial.validation.ts   # ✅
│   │   └── testimonial.types.ts        # ✅
│   │
│   ├── client/
│   │   ├── client.controller.ts   # ✅
│   │   ├── client.service.ts      # ✅
│   │   ├── client.routes.ts       # ✅
│   │   ├── client.validation.ts   # ✅
│   │   └── client.types.ts        # ✅
│   │
│   ├── contact/
│   │   ├── contact.controller.ts   # ✅
│   │   ├── contact.service.ts      # ✅
│   │   ├── contact.routes.ts       # ✅
│   │   ├── contact.validation.ts   # ✅
│   │   └── contact.types.ts        # ✅
│   │
│   └── process/
│       ├── process.controller.ts   # ✅
│       ├── process.service.ts      # ✅
│       ├── process.routes.ts       # ✅
│       ├── process.validation.ts   # ✅
│       └── process.types.ts        # ✅
│
├── middleware/            # Global middleware
│   ├── auth.ts            # JWT authentication
│   └── errorHandler.ts    # Error handling
│
├── lib/                   # Utilities
│   └── prisma.ts          # Prisma client
│
└── index.ts               # Entry point
```

## 🎯 Nguyên tắc tổ chức

### 1. **Module Structure** (Mỗi module tự chứa)
```
module/
├── *.controller.ts  → HTTP request handlers (yêu cầu/response)
├── *.service.ts     → Business logic (tính toán, validation, DB operations)
├── *.routes.ts      → Express route definitions
├── *.validation.ts  → Zod schemas (input validation)
└── *.types.ts       → TypeScript interfaces/types
```

### 2. **Responsibility Separation**
- **Controller**: Chỉ lo nhận request → gọi service → trả response
- **Service**: Lo business logic, database operations, tính toán
- **Routes**: Chỉ mapping HTTP methods/paths → controller
- **Validation**: Zod schemas cho input validation
- **Types**: TypeScript interfaces & types

### 3. **Dependency Flow**
```
Routes → Controller → Service → Database
                    ↓
               Validation
```

## 📝 Ví dụ: Module Structure

### `auth.module`
```typescript
// auth.types.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: {
    adminId: string;
    email: string;
  };
}

// auth.validation.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// auth.service.ts
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from './auth.validation';
import type { LoginRequest, AuthResponse } from './auth.types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    // Validate
    const validated = loginSchema.parse(data);
    
    // Business logic
    const admin = await prisma.admin.findUnique({
      where: { email: validated.email }
    });
    
    if (!admin) {
      throw new Error('Invalid credentials');
    }
    
    const isValid = await bcrypt.compare(validated.password, admin.password);
    
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    const token = jwt.sign(
      { adminId: admin.adminId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    return {
      token,
      admin: { adminId: admin.adminId, email: admin.email }
    };
  }
};

// auth.controller.ts
import { Request, Response } from 'express';
import { authService } from './auth.service';
import type { LoginRequest } from './auth.types';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body;
      const result = await authService.login(data);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }
};

// auth.routes.ts
import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

router.post('/login', authController.login);

export default router;
```

## ✅ Lợi ích

| Trước (Flat) | Sau (Modular) |
|--------------|---------------|
| Tách rời routes, middleware | Module tự chứa mọi thứ |
| Khó tìm code liên quan | Mọi thứ về module trong 1 folder |
| Khó test | Test từng module độc lập |
| Khó scale | Thêm module = thêm folder |
| Logic trộn lẫn | Rõ ràng: Controller → Service → DB |

## 🚀 API Endpoints (Đang hoạt động)

### Public
- `GET /api/services` - ✅ Working
- `GET /api/projects`
- `GET /api/testimonials`
- `GET /api/clients`
- `GET /api/process`
- `POST /api/contact`

### Admin (Protected)
- `POST /api/auth/login`
- `POST/PUT/DELETE /api/services/*`
- `POST/PUT/DELETE /api/projects/*`
- `POST/PUT/DELETE /api/testimonials/*`
- `POST/PUT/DELETE /api/clients/*`
- `POST/PUT/DELETE /api/process/*`