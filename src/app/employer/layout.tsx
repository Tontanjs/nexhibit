import { currentEmployer } from "@/lib/current-employer";
import { EmployerHeader } from "@/components/layout/EmployerHeader";
import { Footer } from "@/components/layout/Footer";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EmployerHeader employer={currentEmployer} />
      <main className="app-shell min-h-[calc(100vh-200px)]">{children}</main>
      <Footer />
    </>
  );
}
