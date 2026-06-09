import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/sections/NavBar";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from '@/components/sections/Footer';
import { ThemeProvider } from '@/context/theme-context';

import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sports Hub",
  description: "Sports Facility Booking Management System",
  icons: {
    icon: '/assets/sports-hub-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <ThemeProvider>
          <NavBar />
          {children}
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
