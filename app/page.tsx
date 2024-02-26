"use server";

import { NavMenu } from "./components/NavMenu";
import { Spotlight } from "./components/Spotlight";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { TrendingMovies } from "./components/actions/actions";

export default async function Home() {
  const TrendingContent = await TrendingMovies();

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center ">
        <NavMenu />

        <div className="animate-in w-full flex-1 flex flex-col pb-14 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20 overflow-hidden">
            <Spotlight contentArray={TrendingContent} />
            <LoadingIndicator />
          </main>
        </div>
      </div>
    </>
  );
}
