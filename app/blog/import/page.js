"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";

import {
  IMPORT_STORAGE_KEY,
  inputClasses,
  labelClasses,
  normalizeImportedPost,
} from "@/lib/blog-editor";

export default function BlogImportPage() {
  const router = useRouter();
  const [jsonInput, setJsonInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const text = await file.text();
      setJsonInput(text);
      setFileName(file.name);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read file.");
    }
  };

  const handleImport = () => {
    try {
      const payload = normalizeImportedPost(JSON.parse(jsonInput));
      window.sessionStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(payload));
      setError("");
      router.push("/blog/write");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON payload.");
    }
  };

  return (
    <div className="flex-1">
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <Section className="pt-0">
          <MotionWrap>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <SectionHeading
                eyebrow="Blog"
                title="Import a Post"
                description="Paste the post JSON or upload the file to continue editing in the writer."
              />
              <div className="flex flex-wrap gap-3">
                <Button href="/blog/write" variant="secondary" size="sm">
                  Back to Write
                </Button>
                <Button href="/blogs/" variant="secondary" size="sm">
                  Back to Blog
                </Button>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="space-y-5">
                <div className="space-y-2">
                  <span className={labelClasses}>Upload JSON</span>
                  <input
                    className={inputClasses}
                    type="file"
                    accept="application/json"
                    onChange={handleFileChange}
                  />
                  {fileName ? (
                    <p className="text-xs text-[var(--muted)]">Loaded: {fileName}</p>
                  ) : null}
                </div>
                <label className="space-y-2">
                  <span className={labelClasses}>Paste JSON</span>
                  <textarea
                    className={inputClasses}
                    rows={12}
                    placeholder='{"slug": "...", "title": "...", "date": "...", "excerpt": "..."}'
                    value={jsonInput}
                    onChange={(event) => setJsonInput(event.target.value)}
                  />
                </label>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <div className="flex w-full flex-wrap items-center justify-end gap-3">
                  <Button onClick={handleImport}>Import &amp; Continue</Button>
                </div>
              </Card>
            </div>
          </MotionWrap>
        </Section>
      </main>
    </div>
  );
}
