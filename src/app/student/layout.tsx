import { currentStudent } from "@/lib/current-user";
import { StudentHeader } from "@/components/layout/StudentHeader";
import { Footer } from "@/components/layout/Footer";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudentHeader user={currentStudent} />
      <main className="app-shell-dark min-h-[calc(100vh-200px)]">{children}</main>
      <Footer compact />
    </>
  );
}
