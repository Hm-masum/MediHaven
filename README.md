<div align="center">

# 🏥 MediHaven

### A Comprehensive Healthcare Management Platform

A full-stack healthcare platform with a **Next.js frontend** and **Express/Node.js backend** — supporting doctors, patients, appointments, prescriptions, secure payments, and more.

Frontend: [MediHaven](https://medihaven123.vercel.app/)

Backend: [MediHaven](https://medihaven-server.onrender.com/)

</div>

---

##  Overview

**MediHaven** is a production-ready, full-stack healthcare management platform. The **backend** is a robust REST API built with Express.js, TypeScript, and PostgreSQL via Prisma ORM. The **frontend** is a modern, responsive web app built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui components.

Together they handle the complete patient-doctor workflow — from registration and appointment booking to video consultations, digital prescriptions, and secure SSLCommerz payments.

---

##  Features

###  Authentication & Authorization
- Role-based access control: Super Admin, Admin, Doctor, Patient
- JWT-based login with refresh token support
- Forced password change on first login
- Account status management (Active / Blocked / Deleted)

###  Doctor Management
- Doctor profiles with specialties, qualifications & designation
- Profile photo upload via Cloudinary
- Schedule & availability management
- Star rating system based on patient reviews

### Patient Management
- Detailed patient health profiles (blood group, allergies, BMI, mental health history, etc.)
- Medical report upload & management

###  Appointment System
- Real-time slot booking with conflict prevention
- Video calling ID generation for virtual consultations
- Appointment status flow: `SCHEDULED → ONPROGRESS → COMPLETED / CANCELED`
- Auto-cancel unpaid appointments via scheduled cron jobs

### Payment Integration
- SSLCommerz payment gateway (Bangladeshi payment support)
- Secure transaction tracking: `PAID / UNPAID`

### Prescription & Reviews
- Digital prescriptions with follow-up date support
- Patient reviews and star ratings after completed appointments

###  Frontend UI/UX
- Modern, responsive design with Tailwind CSS v4 & Radix UI
- Dark/light theme support via next-themes
- Smooth animations with Framer Motion
- Data tables via TanStack Table
- Interactive charts via Recharts
- Form handling with React Hook Form + Zod validation
- Toast notifications via Sonner

---

##  Tech Stack

### Backend
| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5 |
| **Language** | TypeScript v5.9 |
| **ORM** | Prisma v6 |
| **Database** | PostgreSQL |
| **Auth** | JSON Web Token (JWT) |
| **Password Hashing** | bcrypt |
| **File Upload** | Multer + Cloudinary |
| **Payment** | SSLCommerz |
| **Email** | Nodemailer |
| **Cron Jobs** | node-cron |
| **Validation** | Zod |
| **Date Utility** | date-fns |

### Frontend
| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 |
| **UI Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Component Library** | Radix UI / shadcn-ui |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Data Tables** | TanStack Table |
| **Charts** | Recharts |
| **HTTP Client** | Axios |
| **Notifications** | Sonner |
| **Theme** | next-themes |

---

##  Database Schema

```
User
 ├── Admin
 ├── Doctor
 │    ├── DoctorSpecialties ──── Specialties
 │    ├── DoctorSchedule   ──── Schedule
 │    ├── Appointment
 │    ├── Prescription
 │    └── Review
 └── Patient
      ├── PatientHealthData
      ├── MedicalReport
      ├── Appointment
      │    ├── Payment
      │    ├── Prescription
      │    └── Review
      └── Review
```

### Enums

| Enum | Values |
|------|--------|
| `UserRole` | `SUPER_ADMIN`, `ADMIN`, `DOCTOR`, `PATIENT` |
| `UserStatus` | `ACTIVE`, `BLOCKED`, `DELETED` |
| `AppointmentStatus` | `SCHEDULED`, `ONPROGRESS`, `COMPLETED`, `CANCELED` |
| `PaymentStatus` | `PAID`, `UNPAID` |
| `Gender` | `MALE`, `FEMALE` |
| `BloodGroup` | `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-` |
| `MaritalStatus` | `MARRIED`, `UNMARRIED`, `DIVORCED`, `WIDOWED` |

---

##  Project Structure

```
medihaven/
├── client/                          # Next.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   ├── components/              # Reusable UI components
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utilities & helpers
│   │   ├── services/                # API service functions (Axios)
│   │   └── types/                   # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
│
└── server/                          # Express.js Backend
    ├── prisma/
    │   ├── schema.prisma            # Database schema
    │   └── seed.ts                  # Seed data
    ├── src/
    │   ├── app/
    │   │   ├── modules/
    │   │   │   ├── Auth/
    │   │   │   ├── User/
    │   │   │   ├── Admin/
    │   │   │   ├── Doctor/
    │   │   │   ├── Patient/
    │   │   │   ├── Appointment/
    │   │   │   ├── Payment/
    │   │   │   ├── Prescription/
    │   │   │   ├── Review/
    │   │   │   ├── Schedule/
    │   │   │   └── Specialties/
    │   │   ├── middlewares/
    │   │   └── routes/
    │   ├── config/
    │   ├── helpers/
    │   ├── shared/
    │   ├── app.ts
    │   └── server.ts
    ├── dist/
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Hm-masum/medihaven.git
cd medihaven
```

### 2. Setup the Backend (Server)

```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```
Backend runs at: `http://localhost:5000`

### 3. Setup the Frontend (Client)

```bash
cd client
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

---

##  Environment Variables

### Backend (`server/.env`)

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/medihaven"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SSLCommerz
STORE_ID=your_store_id
STORE_PASS=your_store_password
SUCCESS_URL=http://localhost:5000/api/payment/success
FAIL_URL=http://localhost:5000/api/payment/fail
CANCEL_URL=http://localhost:5000/api/payment/cancel
```

### Frontend (`client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

##  Scripts

### Backend
```bash
npm run dev          # Start development server (hot reload)
npm run build        # Compile TypeScript to JS
npm start            # Start production server
npm run start:prod   # Start with NODE_ENV=production
```

### Frontend
```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

