"use client";

import { ContentGrid } from "./ContentGrid";

export function SearchContent({ content }: { content: any }) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <ContentGrid content={content} />
    </div>
  );
}
