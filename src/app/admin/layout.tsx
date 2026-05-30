import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="app-shell min-h-[calc(100vh-200px)]">{children}</main>
      <Footer />
    </>
  );
}
