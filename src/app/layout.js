import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CineMatch 🍿",
  description: "Descubre y guarda tus películas favoritas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-900 text-white antialiased min-h-screen flex flex-col">
        <Navbar/>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
