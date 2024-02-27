"use client";

import { cache, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ContentGrid } from "./ContentGrid";
import { GetHomePageContent } from "@/components/actions/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function ContentLoad() {
  const { ref, inView, entry } = useInView();
  const [page, setPage] = useState<number>(1);
  const [canLoad, setCanLoad] = useState<any>(false);
  const [newContent, setNewContent] = useState<any>([]);

  useEffect(() => {
    GetPageData();
    GetContentData();
    setCanLoad(true);
  }, []);

  useEffect(() => {
    if (canLoad) {
      SetPageData();
    }
  }, [page]);

  useEffect(() => {
    if (canLoad) {
      SetContentData();
    }
  }, [newContent]);

  useEffect(() => {
    if (inView && canLoad) {
      LoadMoreContent();
    }
  }, [inView]);

  const LoadMoreContent = async () => {
    const newContent: any = await GetHomePageContent(page);
    setNewContent((state: any) => [...state, ...newContent]);
    setPage((page) => page + 1);
  };

  function GetContentData() {
    if (sessionStorage?.getItem("HomepageContent")) {
      setNewContent(
        JSON.parse(sessionStorage?.getItem("HomepageContent") ?? "")
      );
    } else {
      setNewContent([]);
    }
  }
  function GetPageData() {
    setPage(parseInt(sessionStorage?.getItem("Homepage") ?? "1"));
  }

  function SetPageData() {
    sessionStorage.setItem("Homepage", String(page));
  }

  function SetContentData() {
    sessionStorage.setItem("HomepageContent", JSON.stringify(newContent));
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <ContentGrid content={newContent} />
      {canLoad && (
        <div ref={ref}>
          <span className="sr-only">Carregando Proxíma Página</span>
          <ArrowPathIcon
            width={25}
            height={25}
            strokeWidth={2}
            className="animate-spin"
          />
        </div>
      )}
    </div>
  );
}
