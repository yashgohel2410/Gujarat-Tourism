import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { Toaster } from "@/components/ui/sonner";
import { EnquiryButton } from "../enquiry-button";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <EnquiryButton />
      <Toaster />
      <Footer />
    </div>
  );
}