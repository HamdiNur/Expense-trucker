# Expense Trucker


[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-181717?style=flat&logo=github)](https://github.com/HamdiNur/Expense-trucker)
[![Vercel](https://img.shields.io/badge/Deployed-on-Vercel-000?style=flat&logo=vercel)](https://expense-trucker-nextjs.vercel.app)

Expense Trucker is a web application built with **Next.js**, **Prisma**, and **Clerk** that allows users to track their expenses and income in real-time. Users can add, delete, and view transactions, calculate balances, and manage budgets with a clean and intuitive interface.

---

## Features

- **User Authentication:** Powered by [Clerk](https://clerk.com) for secure login and registration.
- **Add Transactions:** Add income and expense transactions with a description and amount.
- **Delete Transactions:** Remove transactions with confirmation prompts.
- **Transaction History:** View a detailed transaction list sorted by date.
- **Balance & Analytics:** Automatically calculate total balance, income, and expenses.
- **Responsive UI:** Built with modern CSS and React components.
- **Notifications:** Uses `react-toastify` for success and error messages.
- **Server-Side Rendering:** Next.js server components with Prisma queries.

---

## Tech Stack

- **Frontend:** Next.js 13, React, TypeScript
- **Backend:** Prisma ORM, PostgreSQL (Neon DB)
- **Authentication:** Clerk
- **Notifications:** React Toastify
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL database (Neon or any hosted PostgreSQL)
- Clerk account for authentication

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/HamdiNur/Expense-trucker.git
cd Expense-trucker

2. **Install dependencies:**
   npm install
   # or
   yarn

3. **Create a .env file in the root folder and add your environment variables:**
  DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require&channel_binding=require
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
  =sk_test_

4. **Run Prisma migrations:**
npx prisma migrate dev

5. **Start the development server:**

npm run dev
# or
yarn dev


**Deployment**

The app is deployed on Vercel:
https://expense-trucker-nextjs.vercel.app

Steps to deploy:

Connect your GitHub repository to Vercel.

Set environment variables in Vercel dashboard.

Vercel will automatically build and deploy the project on push.

├── app/                     # Next.js pages and server components
│   ├── components/          # React components (AddTransaction, Balance, TransactionItem, TransactionList)
│   ├── action/              # Server actions (add, delete, get transactions)
│   └── page.tsx             # Home page
├── lib/                     # Database connection and utility functions
├── prisma/                  # Prisma schema and migrations
├── types/                   # TypeScript interfaces
└── package.json


**Contributing**

Fork the repository.

Create your feature branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature).

Open a Pull Request.