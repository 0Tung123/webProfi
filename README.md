# HAT Studio - Full Stack Portfolio CMS

Hệ thống portfolio hoàn chỉnh với Backend API (Express + Prisma + PostgreSQL) và Frontend (Next.js 16 + React 19) kèm Admin Dashboard để quản lý nội dung.

---

## 📁 Cấu trúc Project

```
webProfi/
├── BE/                         # Backend API
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.ts       # Prisma client
│   │   ├── middleware/
│   │   │   ├── auth.ts         # JWT authentication
│   │   │   └── errorHandler.ts # Error handling
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── project.routes.ts
│   │   │   ├── service.routes.ts
│   │   │   ├── testimonial.routes.ts
│   │   │   ├── client.routes.ts
│   │   │   ├── contact.routes.ts
│   │   │   └── process.routes.ts
│   │   ├── index.ts            # Entry point
│   │   └── seed.ts             # Database seed
│   ├── .env                    # Environment variables
│   ├── docker-compose.yml      # Docker setup
│   └── package.json
│
└── FE/                         # Frontend Next.js
    ├── app/
    │   ├── admin/              # Admin Dashboard
    │   │   ├── components/
    │   │   │   ├── AdminSidebar.tsx
    │   │   │   ├── DataTable.tsx
    │   │   │   └── DataForm.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx    # Admin login
    │   │   ├── projects/
    │   │   │   └── page.tsx    # Projects CRUD
    │   │   ├── services/
    │   │   │   └── page.tsx    # Services CRUD
    │   │   ├── testimonials/
    │   │   │   └── page.tsx    # Testimonials CRUD
    │   │   ├── clients/
    │   │   │   └── page.tsx    # Clients CRUD
    │   │   ├── process/
    │   │   │   └── page.tsx    # Process CRUD
    │   │   ├── contact/
    │   │   │   └── page.tsx    # Contact submissions
    │   │   ├── layout.tsx      # Admin layout
    │   │   └── page.tsx        # Admin dashboard
    │   ├── contexts/
    │   │   └── AuthContext.tsx # Auth provider
    │   ├── hooks/
    │   │   ├── useServices.ts
    │   │   ├── useProjects.ts
    │   │   ├── useTestimonials.ts
    │   │   ├── useClients.ts
    │   │   └── useProcess.ts
    │   ├── lib/
    │   │   ├── api/
    │   │   │   ├── apiClient.ts
    │   │   │   ├── services.service.ts
    │   │   │   ├── projects.service.ts
    │   │   │   ├── testimonials.service.ts
    │   │   │   ├── clients.service.ts
    │   │   │   ├── process.service.ts
    │   │   │   ├── contact.service.ts
    │   │   │   └── auth.service.ts
    │   │   └── config.ts
    │   ├── sections/
    │   │   ├── ServicesSection.tsx
    │   │   ├── ProjectsSection.tsx
    │   │   └── ...
    │   ├── layout.tsx
    │   └── page.tsx
    ├── .env.local              # Environment variables
    └── package.json
```

---

## 🚀 Setup & Run

### 1️⃣ Backend Setup

```bash
cd BE

# Cài dependencies
npm install

# Khởi tạo Docker PostgreSQL
npm run docker:init

# Chạy server
npm run dev
```

Backend chạy tại: **http://localhost:8080**

### 2️⃣ Frontend Setup

```bash
cd FE

# Cài dependencies
npm install

# Chạy development server
npm run dev
```

Frontend chạy tại: **http://localhost:3000**

---

## 🔐 Admin Login

- **URL:** http://localhost:3000/admin/login
- **Email:** admin@hatstudio.local
- **Password:** HatAdmin2024!

⚠️ **ĐỔI NGAY** trong production!

---

## 📊 Admin Dashboard Features

### CRUD Quản lý:

| Module | Chức năng |
|--------|-----------|
| **Dashboard** | Overview thống kê |
| **Projects** | Tạo/sửa/xóa dự án |
| **Services** | Tạo/sửa/xóa dịch vụ |
| **Testimonials** | Tạo/sửa/xóa testimonial |
| **Clients** | Tạo/sửa/xóa khách hàng |
| **Process** | Tạo/sửa/xóa quy trình |
| **Contact** | Xem tin nhắn contact form |

---

## 🌐 Public Frontend

Các component FE đang fetch data từ BE:

- **ServicesSection** → `GET /api/services`
- **ProjectsSection** → `GET /api/projects`
- **Testimonials** → `GET /api/testimonials`
- **Clients** → `GET /api/clients`
- **ProcessSection** → `GET /api/process`

---

## 📡 API Endpoints

### Public
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/projects` | Danh sách projects |
| GET | `/api/projects/:id` | Chi tiết project |
| GET | `/api/services` | Danh sách services |
| GET | `/api/testimonials` | Danh sách testimonials |
| GET | `/api/clients` | Danh sách clients |
| GET | `/api/process` | Danh sách quy trình |
| GET | `/api/process/:category` | Quy trình theo category |
| POST | `/api/contact` | Submit contact form |

### Admin (cần JWT)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/login` | Admin login |
| POST/PUT/DELETE | `/api/projects/*` | CRUD projects |
| POST/PUT/DELETE | `/api/services/*` | CRUD services |
| POST/PUT/DELETE | `/api/testimonials/*` | CRUD testimonials |
| POST/PUT/DELETE | `/api/clients/*` | CRUD clients |
| POST/PUT/DELETE | `/api/process/*` | CRUD process |
| GET | `/api/contact` | Xem submissions |

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma 5.22
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **Container:** Docker

### Frontend
- **Framework:** Next.js 16 (App Router)
- **React:** 19.2.4
- **Styling:** TailwindCSS 4
- **HTTP Client:** Axios
- **State:** React Hooks + Context API

---

## 📦 Docker Commands

```bash
# Backend
cd BE

# Start PostgreSQL
npm run docker:up

# Stop PostgreSQL
npm run docker:down

# View logs
npm run docker:logs

# Full init (start + migrate + seed)
npm run docker:init
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=8080
NODE_ENV=development
DATABASE_URL=postgresql://hatuser:hatstudio2024@localhost:5432/hat_studio
JWT_SECRET=hat-studio-jwt-secret-key-2024
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_EMAIL=admin@hatstudio.local
ADMIN_PASSWORD=HatAdmin2024!
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 📝 Hướng dẫn sử dụng

### Thay đổi dữ liệu trên Frontend

1. **Truy cập Admin Dashboard:**
   - Mở http://localhost:3000/admin/login
   - Đăng nhập với credentials ở trên

2. **Quản lý nội dung:**
   - Vào mục tương ứng (Projects, Services, etc.)
   - Click "+ Add [Item]" để tạo mới
   - Click "Edit" để sửa
   - Click "Delete" để xóa

3. **Xem thay đổi trên FE:**
   - Frontend tự động fetch data từ BE
   - Refresh trang để thấy thay đổi

### Contact Form

- Khách hàng submit form trên website → data lưu vào DB
- Admin vào **Admin > Contact Submissions** để xem
- Mark as read hoặc xóa tin nhắn

---

## 🚀 Deploy Production

### Backend
- **Railway:** Dễ nhất, có PostgreSQL built-in
- **Render:** Free tier available
- **Vercel:** Serverless functions
- **AWS:** RDS + ECS/Elastic Beanstalk

### Frontend
- **Vercel:** Native Next.js support
- **Netlify:** With serverless functions
- **Railway:** Full-stack deployment

### Environment cần set:
```env
# Backend
NODE_ENV=production
DATABASE_URL=<production postgresql>
JWT_SECRET=<strong random secret>
CORS_ORIGINS=https://yourdomain.com

# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

---

## 📞 Support

Contact: admin@hatstudio.local