import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista Zakupów",
  description: "Błyskawiczna lista zakupów w czasie rzeczywistym",
  manifest: "/manifest.json",
  openGraph: {
    title: "Lista Zakupów",
    description: "Błyskawiczna lista zakupów w czasie rzeczywistym",
    url: "https://listazakupy.netlify.app/",
    siteName: "Lista Zakupów",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        // WAŻNE: Social media wymagają PEŁNEGO linku domeny dla grafik podglądu!
        url: "https://listazakupy.netlify.app/bigLogo.png",
        width: 192,
        height: 192,
        alt: "Logo Telefony Gorlice",
      },
    ],
  },
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
          <Toaster
            containerStyle={{
              top: 100,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            toastOptions={{
              // Wszystkie powiadomienia będą wisieć domyślnie przez 3 sekundy
              duration: 700,
            }}
          />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
