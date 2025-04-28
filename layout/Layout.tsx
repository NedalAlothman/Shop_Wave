import Navbar from "./Navbar";
import Footer from "./Footer";

import { ReactNode } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { StoreProvider } from "../contexts/StoreContext";

import { Toaster } from "../components/ui/toaster";
import { Toaster as Sonner } from "../components/ui/sonner";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
};
