"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
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

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TinyMCEEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const TINYMCE_CDN = "https://cdn.jsdelivr.net/npm/tinymce@8.3.2/tinymce.min.js";

export default function BlogWritePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [starred, setStarred] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (!date) {
      setDate(new Date().toISOString().slice(0, 10));
    }
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [date, slugTouched, title]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const raw = window.sessionStorage.getItem(IMPORT_STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const imported = normalizeImportedPost(JSON.parse(raw));
      setTitle(imported.title);
      setSlug(imported.slug);
      setSlugTouched(true);
      setDate(imported.date);
      setExcerpt(imported.excerpt);
      setTagsInput(imported.tags.join(", "));
      setCoverImage(imported.coverImage);
      setStarred(imported.starred);
      setContent(imported.content);
      editorRef.current?.setContent(imported.content);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load imported JSON.");
    } finally {
      window.sessionStorage.removeItem(IMPORT_STORAGE_KEY);
    }
  }, []);

  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsInput]
  );

  const handleExport = () => {
    const contentHtml = editorRef.current?.getContent({ format: "html" }) ?? content;
    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      date: date.trim(),
      excerpt: excerpt.trim(),
      content: contentHtml,
      tags,
      coverImage: coverImage.trim() || null,
      starred,
    };

    if (!payload.slug || !payload.title || !payload.date || !payload.excerpt || !payload.content) {
      setError("Fill in title, slug, date, excerpt, and content before exporting.");
      return;
    }

    setError("");
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${payload.slug}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    const confirmed = window.confirm("Reset the form and clear all content?");
    if (!confirmed) {
      return;
    }
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setDate(new Date().toISOString().slice(0, 10));
    setExcerpt("");
    setTagsInput("");
    setCoverImage("");
    setStarred(false);
    setContent("");
    editorRef.current?.setContent("");
    setError("");
  };

  return (
    <div className="flex-1">
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <Section className="pt-0">
          <MotionWrap>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <SectionHeading
                eyebrow="Blog"
                title="Write a New Post"
                description="Draft your post in TinyMCE, then export the JSON and drop it into data/blogs/."
              />
              <div className="flex flex-wrap gap-3">
                <Button href="/blog/import" variant="secondary" size="sm">
                  Import JSON
                </Button>
                <Button href="/blogs/" variant="secondary" size="sm">
                  Back to Blog
                </Button>
                <Button href="/" variant="secondary" size="sm">
                  Back to Portfolio
                </Button>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClasses}>Title</span>
                    <input
                      className={inputClasses}
                      placeholder="Post title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClasses}>Slug</span>
                    <input
                      className={inputClasses}
                      placeholder="post-slug"
                      value={slug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        setSlug(event.target.value);
                      }}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClasses}>Date</span>
                    <input
                      className={inputClasses}
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClasses}>Tags</span>
                    <input
                      className={inputClasses}
                      placeholder="platform, reliability, ops"
                      value={tagsInput}
                      onChange={(event) => setTagsInput(event.target.value)}
                    />
                  </label>
                </div>
                <label className="space-y-2">
                  <span className={labelClasses}>Excerpt</span>
                  <textarea
                    className={inputClasses}
                    rows={3}
                    placeholder="Short summary used in the blog list."
                    value={excerpt}
                    onChange={(event) => setExcerpt(event.target.value)}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClasses}>Cover image (optional)</span>
                  <input
                    className={inputClasses}
                    placeholder="/og.png"
                    value={coverImage}
                    onChange={(event) => setCoverImage(event.target.value)}
                  />
                </label>
                <label className="mt-2 flex items-center gap-3 text-sm text-[var(--foreground)]">
                  <input
                    type="checkbox"
                    checked={starred}
                    onChange={(event) => setStarred(event.target.checked)}
                    className="h-4 w-4 rounded border-[var(--border)] bg-[var(--surface)] accent-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/40"
                  />
                  Mark as starred (show on homepage)
                </label>
              </Card>
              <Card className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className={labelClasses}>Content</span>
                  {tags.length ? (
                    <span className="text-xs text-muted">
                      Tags: {tags.join(", ")}
                    </span>
                  ) : null}
                </div>
                <TinyMCEEditor
                  tinymceScriptSrc={TINYMCE_CDN}
                  value={content}
                  onEditorChange={(value) => setContent(value)}
                  onInit={(_, editor) => {
                    editorRef.current = editor;
                  }}
                  outputFormat="html"
                  init={{
                    height: 420,
                    menubar: true,
                    entity_encoding: "raw",
                    convert_urls: false,
                    relative_urls: false,
                    remove_script_host: false,
                    plugins:
                      "accordion advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount autosave directionality emoticons quickbars codesample nonbreaking pagebreak autoresize visualchars importcss save",
                    toolbar:
                      "undo redo | styles | bold italic underline strikethrough | forecolor backcolor | " +
                      "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                      "link image media table | charmap anchor insertdatetime | pagebreak | " +
                      "preview fullscreen | searchreplace visualblocks visualchars code | help",
                    toolbar_mode: "sliding",
                    toolbar_sticky: true,
                    quickbars_insert_toolbar:
                      "quicktable image media codesample | bullist numlist | link",
                    quickbars_selection_toolbar:
                      "bold italic underline | quicklink h2 h3 blockquote",
                    skin: "oxide",
                    content_css: "default",
                    branding: false,
                    promotion: false,
                    license_key: "gpl",
                  }}
                />
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <div className="flex w-full flex-wrap items-center justify-between gap-3">
                  <Button onClick={handleReset} variant="secondary">
                    Reset form
                  </Button>
                  <Button onClick={handleExport}>Download JSON</Button>
                </div>
              </Card>
            </div>
          </MotionWrap>
        </Section>
      </main>
    </div>
  );
}
