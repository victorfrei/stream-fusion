"use server";

import BackButton from "@/components/BackButton";
import { NavMenu } from "@/components/NavMenu";
import { SearchContent } from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";
import { Search, SearchRedirect } from "@/components/actions/actions";

export default async function Home({
  params,
}: {
  params: { lang: string; query: string };
}) {
  const content = await Search({ query: params.query, lang: params.lang });

  return (
    <>
      <div id="navBar" className="fixed top-0 h-10 w-full z-50"></div>
      <NavMenu />

      <div className="animate-in w-full opacity-0 pt-40">
        <main className="w-full flex flex-col justify-center items-center gap-10">
          <div className="flex justify-between items-center w-full pl-20 pr-28">
            <BackButton />
            <span className="text-2xl font-medium">
              {decodeURI(params.query.toUpperCase())}
            </span>{" "}
            <span className="text-lg flex justify-center items-center gap-2">
              <span>{params.lang.toUpperCase()}</span>
            </span>
          </div>
          <SearchContent content={content} />
        </main>
      </div>
    </>
  );
}
