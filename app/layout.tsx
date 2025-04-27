import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { Layout } from "../layout/Layout";
import { UserProvider } from "@/lib/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shop Wave",
  description: "Your Modern E-commerce Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-screen bg-background antialiased`}>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </body>
    </html>
  );
}
