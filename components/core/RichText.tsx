"use client";

import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: SerializedEditorState | null | undefined;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      <PayloadRichText data={content} />
    </div>
  );
}
