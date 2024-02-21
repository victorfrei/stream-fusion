"use server";

import BackButton from "@/components/BackButton";
import { NavMenu } from "@/components/NavMenu";
import { Spotlight } from "@/components/Spotlight";
import { SpotlightDetails } from "@/components/SpotlightDetails";

async function GetContentDetails(contentId: number, contentType: string) {
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

    const video = videos.results.filter((e: any) => e.type == "Trailer")[0];

    return { ...movie, video: video };
  } else {
    return [];
  }
}

export default async function Home({
  params,
}: {
  params: { id: number; type: string };
}) {
  const content = await GetContentDetails(params.id, params.type);

  return (
    <>
      {/* Remover Overflow depois */}
      <div className="left-slide-in w-full h-full flex flex-col gap-10 items-center">
        <NavMenu withBackground={true} />

        <div className="animate-in w-full flex-1 flex flex-col pb-10 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            <BackButton />
            <SpotlightDetails contentType={params.type} content={content} />
          </main>
        </div>
      </div>
    </>
  );
}
