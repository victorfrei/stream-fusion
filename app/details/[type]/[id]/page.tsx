"use server";

import { CastGrid } from "@/components/CastGrid";
import { ContentGrid } from "@/components/ContentGrid";
import { NavMenu } from "@/components/NavMenu";
import { SpotlightDetails } from "@/components/SpotlightDetails";
import { GetContentDetails } from "@/components/actions/actions";

export default async function Home({
  params,
}: {
  params: { id: number; type: string };
}) {
  const content = await GetContentDetails(params.id, params.type);

  return (
    <>
      <div className="left-slide-in flex flex-col gap-20 items-center pb-20">
        <NavMenu />

        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0">
          <main className="flex-1 flex flex-col justify-start gap-20">
            <SpotlightDetails contentType={params.type} content={content} />
            {content.casts.length > 0 && (
              <CastGrid content={content.casts} title={`Atores`} />
            )}
            {content.recomendations.length > 0 && (
              <ContentGrid
                content={content.recomendations}
                title="Conteúdos Similares"
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
