import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista Zakupów",
  description: "Błyskawiczna lista zakupów w czasie rzeczywistym",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-full">
      <body
        className={`${inter.className} h-full bg-slate-100 text-slate-900 antialiased`}
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          id="global-loader"
        >
          <Loading />
        </div>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
