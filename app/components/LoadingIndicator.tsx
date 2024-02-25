"use client";

import { cache, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ContentGrid } from "./ContentGrid";
import { GetHomePageContent } from "@/components/actions/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function LoadingIndicator() {
  const { ref, inView, entry } = useInView();
  const [page, setPage] = useState<number>(GetPageData());
  const [newContent, setNewContent] = useState<any>(GetContentData());

  useEffect(() => {
    SetPageData();
  }, [page]);

  useEffect(() => {
    SetContentData();
  }, [newContent]);

  useEffect(() => {
    if (inView) {
      LoadMoreContent();
    }
  }, [inView]);

  const LoadMoreContent = async () => {
    const newContent: any = await GetHomePageContent(page);
    setNewContent((state: any) => [...state, ...newContent]);
    setPage((page) => page + 1);
  };

  function GetContentData() {
    if (sessionStorage.getItem("HomepageContent")) {
      return JSON.parse(sessionStorage.getItem("HomepageContent") ?? "");
    } else {
      return [];
    }
  }
  function GetPageData() {
    return parseInt(sessionStorage.getItem("Homepage") ?? "1");
  }

  function SetPageData() {
    console.log(page);
    sessionStorage.setItem("Homepage", String(page));
  }

  function SetContentData() {
    sessionStorage.setItem("HomepageContent", JSON.stringify(newContent));
  }

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
