"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function BlogRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/blogs/");
  }, [router]);

  return (
    <div className="min-h-screen blog-shell">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:px-10">
        <Card className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold text-slate-100">Redirecting</h1>
          <p className="text-sm text-muted">
            Taking you to the full blog listing. If you are not redirected, use
            the button below.
          </p>
          <Button href="/blogs/" variant="secondary" size="sm" className="self-start">
            Go to Blogs
          </Button>
        </Card>
      </main>
    </div>
  );
}
