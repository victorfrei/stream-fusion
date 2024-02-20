import { Inter } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Stream Fusion",
  description: "Sua pesquisa na velocidade da sua vontade",
};

const inter = Inter({weight: ["100","200","300","400","500","600","700","800","900"], subsets: ["latin"]})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className +"dark"}>
      <body className="bg-background text-text">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
