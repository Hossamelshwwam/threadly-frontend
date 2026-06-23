# 🛍️ Threadly — Multi-Vendor Marketplace

> A modern, multi-vendor e-commerce platform connecting buyers with independent sellers.

🔗 **Live Demo:** [threadly-website.vercel.app](https://threadly-website.vercel.app/)

> ⚠️ **Known Limitation:** The **Orders** section is currently view-only. No actions (confirm, cancel, update, etc.) can be performed on orders because the backend uses a session-based database feature that is not supported in the current deployment environment.

---

## 🎥 Demo

### 👤 Buyer View

https://drive.google.com/file/d/1FXEx91Y5qSqLFPWCggxESnJJPIzA3wAn/view?usp=sharing

### 🏪 Seller Dashboard

https://drive.google.com/file/d/1FXEx91Y5qSqLFPWCggxESnJJPIzA3wAn/view?usp=drive_link

### 🛡️ Admin Dashboard

https://drive.google.com/file/d/12D3u7hzhHtHNqPlkubLKM9hoS5kaCkXT/view?usp=drive_link

---

## ✨ Features

### 👤 For Buyers

- Browse and search products across multiple stores
- Add items to cart and place orders
- Manage profile and order history

### 🏪 For Sellers

- Register and manage your own store
- List, update, and track product inventory
- Handle incoming orders via the seller dashboard

### 🛡️ For Admins

- Oversee all users, sellers, and products
- Manage categories, orders, and payouts
- Full platform control from a dedicated admin dashboard

---

## 🛠️ Tech Stack

| Technology                | Purpose                         |
| ------------------------- | ------------------------------- |
| **Next.js 16**            | React framework with App Router |
| **React 19**              | UI library                      |
| **TypeScript**            | Type safety                     |
| **Tailwind CSS v4**       | Utility-first styling           |
| **shadcn/ui + Radix UI**  | Accessible UI components        |
| **TanStack Query v5**     | Server state & data fetching    |
| **TanStack Table v8**     | Powerful data tables            |
| **React Hook Form + Zod** | Form handling & validation      |
| **Axios**                 | HTTP client                     |
| **Swiper**                | Touch-friendly sliders          |
| **Sonner**                | Toast notifications             |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
git clone https://github.com/Hossamelshwwam/threadly-frontend.git
cd threadly-frontend
npm install
```

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
threadly-frontend/
├── app/              # Next.js App Router pages & layouts
├── components/ui/    # Reusable UI components (shadcn)
├── domains/          # Domain-Driven Design structure
├── infrastructure/   # API clients & services
├── lib/              # Utility functions
├── shared/           # Shared types & constants
└── public/           # Static assets
```

---

## 📝 License

This project is private. All rights reserved.
