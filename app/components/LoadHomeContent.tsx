"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ContentGrid } from "./ContentGrid";

export function LoadHomeContent() {
  const { ref, inView, entry } = useInView();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inView) {
      setPage((state) => state + 1);
    }
  }, [inView]);

  return <ContentGrid />;
}
