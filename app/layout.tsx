// app/layout.tsx
import type { Metadata } from "next";
import { Roboto, Roboto_Mono as RobotoMono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";

// Import ToastContainer styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = RobotoMono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and create a budget",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${robotoSans.variable} ${robotoMono.variable}`}>
          <Header />
          <main className="container">{children}</main>

     {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        aria-label="notification"
      />        </body>
      </html>
    </ClerkProvider>
  );
}
