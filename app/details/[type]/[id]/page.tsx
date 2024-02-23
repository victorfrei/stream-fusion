"use server";

import { NavMenu } from "@/components/NavMenu";
import { SpotlightDetails } from "@/components/SpotlightDetails";
import { cache } from "react";

const GetContentDetails = cache(
  async (contentId: number, contentType: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
      },
    };

    if (contentId) {
      const responseDetails = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}?language=pt-BR`,
        options
      );
      const movie = await responseDetails.json();

      const responseVideos = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?language=en-US`,
        options
      );
      const videos = await responseVideos.json();

      const video = videos?.results?.filter((e: any) => e.type == "Trailer")[0];

      return { ...movie, video: video };
    } else {
      return [];
    }
  }
);

export default async function Home({
  params,
}: {
  params: { id: number; type: string };
}) {
  const content = await GetContentDetails(params.id, params.type);

  return (
    <>
      {/* Remover Overflow depois */}
      {/* <Suspense fallback={<p>Loading Content</p>}> */}
      <div className="left-slide-in flex flex-col gap-10 items-center">
        <NavMenu withBackground={false} />

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0">
          <main className="flex-1 flex flex-col justify-start gap-20">
            <SpotlightDetails contentType={params.type} content={content} />
          </main>
        </div>
      </div>
      {/* </Suspense> */}
    </>
  );
}
