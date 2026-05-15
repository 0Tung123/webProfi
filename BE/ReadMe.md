# HAT Studio Backend

Express.js backend API cho HAT Studio portfolio.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env với cấu hình database PostgreSQL
```

3. **Setup database:**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Seed database (tạo admin + dữ liệu mẫu):**
```bash
npm run seed
```

5. **Run development server:**
```bash
npm run dev
```

Backend sẽ chạy trên `http://localhost:8080`

## API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Lấy danh sách projects |
| GET | `/api/projects/:projectId` | Lấy chi tiết project |
| GET | `/api/services` | Lấy danh sách services |
| GET | `/api/testimonials` | Lấy danh sách testimonials |
| GET | `/api/clients` | Lấy danh sách clients |
| GET | `/api/process` | Lấy tất cả quy trình |
| GET | `/api/process/:category` | Lấy quy trình theo category (design/brand/code/photo) |
| POST | `/api/contact` | Submit contact form |

### Admin Endpoints (cần JWT authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:projectId` | Update project |
| DELETE | `/api/projects/:projectId` | Delete project |
| *(tương tự cho services, testimonials, clients, process)* | | |

## Default Admin Credentials

Sau khi seed lần đầu:
- **Email:** `admin@hatmedia.vn`
- **Password:** `ChangeMe123!`

⚠️ **THAY ĐỔI NGAY** trong production!

## Database Management

Xem database với Prisma Studio:
```bash
npx prisma studio
```

## Environment Variables

```env
PORT=8080
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hat_studio?schema=public"
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGINS=http://localhost:3000
ADMIN_EMAIL=admin@hatmedia.vn
ADMIN_PASSWORD=ChangeMe123!
```

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **File Upload:** Multer (sẵn sàng cho tích hợp)
