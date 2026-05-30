import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotFound404 } from "@/components/illustrations/NotFound404";
import { copy } from "@/lib/copy";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-20 text-center">
        <NotFound404 size={200} />
        <div>
          <h1 className="text-2xl font-black text-ink-900">{copy.pages.notFound.heading}</h1>
          <p className="mt-2 text-sm text-ink-400">{copy.pages.notFound.body}</p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/">{copy.pages.notFound.backHome}</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
