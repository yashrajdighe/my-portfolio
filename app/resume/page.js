"use client";

import { useEffect } from "react";

export default function ResumeRedirect() {
  useEffect(() => {
    window.location.replace("/resume.pdf");
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center text-slate-200">
      <p className="text-sm text-slate-300">Redirecting to the resume PDF…</p>
      <a
        className="mt-4 text-sm text-emerald-200 hover:text-emerald-100"
        href="/resume.pdf"
      >
        Open the resume PDF
      </a>
    </div>
  );
}
