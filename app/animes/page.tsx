import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Image from "next/image";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import Link from "next/link";
import { NavMenu } from "@/components/NavMenu";


export default async function Home() {
  const supabase = createClient();


  // const spotlightMovie = await SpotlightMovie();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavMenu active={3} />

        <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 px-20">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            <button className="relative overflow-hidden border-2 border-transparent hover:border-text cursor-pointer transition-all rounded-2xl group">
              <div className="absolute flex justify-start items-center gap-10 px-20 z-10 w-full h-full bg-gradient-to-r from-black  to-black/20 rounded-2xl">
                
              </div>
             
            </button>
            <div className="flex flex-col justify-center items-start gap-5">
              <h2 className="font-bold text-3xl mb-4 text-textSecondary">
                Recomendados
              </h2>
            </div>
          </main>
        </div>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Powered by Stream Fusion © 2024</p>
        </footer>
      </div>
    </>
  );
}
