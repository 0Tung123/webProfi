# HAT Studio Backend

Express.js backend API cho HAT Studio portfolio.

## 🚀 Quick Start

### Option 1: Docker (Khuyến nghị)

```bash
# 1. Chạy database với Docker
npm run docker:init

# 2. Server sẽ tự động chạy ở http://localhost:8080
npm run dev
```

### Option 2: Manual

```bash
# 1. Install dependencies
npm install

# 2. Chạy PostgreSQL (qua Docker)
npm run docker:up

# 3. Wait 5 giây cho DB khởi động, sau đó:
npx prisma migrate dev
npx prisma generate

# 4. Seed database
npm run prisma:seed

# 5. Chạy server
npm run dev
```

## 📋 Scripts Available

| Command | Description |
|---------|-------------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build TypeScript |
| `npm start` | Chạy production server |
| `npm run docker:up` | Start PostgreSQL container |
| `npm run docker:down` | Stop PostgreSQL container |
| `npm run docker:init` | Start DB + migrate + seed |
| `npx prisma:studio` | GUI cho database |

## 🔐 Default Admin

- **Email:** `admin@hatstudio.local`
- **Password:** `HatAdmin2024!`

⚠️ **ĐỔI NGAY** trong production!

## 📁 Cấu trúc

```
BE/
├── .github/workflows/
│   └── ci.yml              # CI/CD pipeline
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── lib/
│   │   └── prisma.ts       # Prisma client
│   ├── middleware/
│   │   ├── auth.ts         # JWT authentication
│   │   └── errorHandler.ts # Error handling
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts
│   │   ├── service.routes.ts
│   │   ├── testimonial.routes.ts
│   │   ├── client.routes.ts
│   │   ├── contact.routes.ts
│   │   └── process.routes.ts
│   ├── index.ts            # Entry point
│   └── seed.ts             # Database seed
├── .env                    # Environment variables
├── docker-compose.yml      # Docker setup
└── package.json
```

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Danh sách projects |
| GET | `/api/projects/:id` | Chi tiết project |
| GET | `/api/services` | Danh sách services |
| GET | `/api/testimonials` | Danh sách testimonials |
| GET | `/api/clients` | Danh sách clients |
| GET | `/api/process` | Danh sách quy trình |
| GET | `/api/process/:category` | Quy trình theo category |
| POST | `/api/contact` | Submit contact form |

### Admin (cần JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST/PUT/DELETE | `/api/projects/*` | Quản lý projects |
| POST/PUT/DELETE | `/api/services/*` | Quản lý services |
| POST/PUT/DELETE | `/api/testimonials/*` | Quản lý testimonials |
| POST/PUT/DELETE | `/api/clients/*` | Quản lý clients |
| POST/PUT/DELETE | `/api/process/*` | Quản lý quy trình |

## 🛠 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **CORS:** cors
- **File Upload:** multer (ready to integrate)

## 📦 Production Deploy

### Variables cần thiết:
```env
NODE_ENV=production
DATABASE_URL=<postgresql connection string>
JWT_SECRET=<strong random secret>
CORS_ORIGINS=<your production domain>
ADMIN_EMAIL=<admin email>
ADMIN_PASSWORD=<strong password>
```

### Platforms gợi ý:
- **Railway** (dễ nhất, có PostgreSQL built-in)
- **Render** (free tier available)
- **Vercel** (cho serverless)
- **AWS** (RDS + ECS/Elastic Beanstalk)

## 📝 License

MIT