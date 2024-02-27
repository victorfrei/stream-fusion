"use server";

import { NavMenu } from "./components/NavMenu";
import { Spotlight } from "./components/Spotlight";
import { ContentLoad } from "./components/ContentLoad";
import { TrendingMovies } from "./components/actions/actions";

export default async function Home() {
  const TrendingContent = await TrendingMovies();

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center ">
        <div id="navBar" className="fixed top-0 h-10 w-full z-50"></div>
        <NavMenu />

        <div className="animate-in w-full flex-1 flex flex-col pb-14 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20 overflow-hidden">
            <Spotlight contentArray={TrendingContent} />
            <ContentLoad />
          </main>
        </div>
      </div>
    </>
  );
}
