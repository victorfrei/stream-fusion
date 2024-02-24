"use server";

import { CastGrid } from "@/components/CastGrid";
import { ContentGrid } from "@/components/ContentGrid";
import { NavMenu } from "@/components/NavMenu";
import { SpotlightDetails } from "@/components/SpotlightDetails";
import Image from "next/image";
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

      const responseCasts = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}/credits?language=pt-BR`,
        options
      );

      const responseRecomendations = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}/recommendations?language=pt-BR`,
        options
      );

      const responseWhereToWatch = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}/watch/providers`,
        options
      );
      const videos = await responseVideos.json();
      let casts = await responseCasts.json();
      let recomendations = await responseRecomendations.json();
      let whereToWatch = await responseWhereToWatch.json();
      const video = videos?.results?.filter((e: any) => e.type == "Trailer")[0];
      casts = casts?.cast?.filter(
        (e: any) => e.known_for_department == "Acting" && e.profile_path != null
      );
      recomendations = recomendations?.results;
      whereToWatch = whereToWatch?.results.BR;

      return {
        ...movie,
        video: video,
        casts,
        recomendations: recomendations,
        whereToWatch: whereToWatch,
      };
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
      <div className="left-slide-in flex flex-col gap-20 items-center pb-20">
        <NavMenu withBackground={false} />

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0">
          <main className="flex-1 flex flex-col justify-start gap-20">
            <SpotlightDetails contentType={params.type} content={content} />

            <CastGrid
              content={content.casts}
              title={`Atores ${
                content.media_type == "tv" ? "da Série" : "do Filme"
              } (Com foto)`}
            />
            <ContentGrid
              content={content.recomendations}
              title="Conteúdos Similares"
            />
          </main>
        </div>
      </div>
    </>
  );
}
