"use client";

import { cache, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ContentGrid } from "./ContentGrid";
import { GetHomePageContent } from "@/actions/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function LoadingIndicator() {
  const { ref, inView, entry } = useInView();
  const [page, setPage] = useState<number>(1);
  const [newContent, setNewContent] = useState<any>([]);

  const LoadMoreContent = async () => {
    const newContent: any = await GetHomePageContent(page);
    setNewContent((state: any) => [...state, ...newContent]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      LoadMoreContent();
      console.log("chamado! " + page);
    }
  }, [inView]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <ContentGrid content={newContent} />
      <div ref={ref}>
        <span className="sr-only">Carregando Proxíma Página</span>
        <ArrowPathIcon
          width={25}
          height={25}
          strokeWidth={2}
          className="animate-spin"
        />
      </div>
    </div>
  );
}
