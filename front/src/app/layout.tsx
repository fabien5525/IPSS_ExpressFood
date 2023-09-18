import AppLayout from "@/components/AppLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpressFood",
  description: "ExpressFood WebApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          minHeight: "100dvh",
        }}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
