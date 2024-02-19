import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { NavMenu } from "@/components/NavMenu";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <NavMenu active={1} />

      <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 px-20">
        <main className="flex-1 w-full grid grid-cols-5 justify-start gap-20">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((e) => (
            <button className="w-full h-44 border-2 text-2xl font-semibold border-transparent bg-secondary hover:border-text cursor-pointer transition-all rounded-2xl">
              Ação
            </button>
          ))}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Powered by Stream Fusion © 2024</p>
      </footer>
    </div>
  );
}
