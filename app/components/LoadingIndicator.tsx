"use client";

import { GetHomePageContent } from "@/page";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ContentGrid } from "./ContentGrid";

export function LoadingIndicator() {
  const { ref, inView, entry } = useInView();
  const [page, setPage] = useState(1);
  const [newContent, setNewContent] = useState<any[]>([]);

  const LoadMoreContent = async () => {
    const newContent: any = await GetHomePageContent(page);
    setNewContent((state: any[]) => [...state, ...newContent]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      LoadMoreContent();
    }
  }, [inView]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <ContentGrid content={newContent} />
      <div ref={ref}>Loading page {page}</div>
    </div>
  );
}
