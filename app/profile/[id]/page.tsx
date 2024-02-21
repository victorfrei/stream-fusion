import { NavMenu } from "@/components/NavMenu";
import { createClient } from "@/utils/supabase/server";
import {
  ArrowLeftIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { US } from "country-flag-icons/react/3x2";
import BackButton from "@/components/BackButton";


export default async function Profile({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {true && (
        <>
          <NavMenu />

          <div className="animate-in flex flex-col justify-start items-start w-full h-screen pt-32 gap-5 lg:px-20 ">
           <BackButton/>
            <div className="flex flex-col gap-4 w-full max-w-full h-fit pt-5 pb-20">
              <div className="relative flex flex-col w-full h-[450px] bg-secondary rounded-2xl overflow-hidden">
                <div className="absolute top-0 bg-gradient-to-r from-red-900 via-pink-700 to-blue-900 w-full h-1/2"></div>
                <div className="absolute bottom-0 flex flex-col px-10 gap-5 h-1/2 -translate-y-20">
                  <Image
                    width={200}
                    height={200}
                    src={
                      "https://ebywanavgfdogjmovwss.supabase.co/storage/v1/object/public/avatars/36%20-%20jd8XbdA.png"
                    }
                    alt="Profile Image"
                    className="w-32 h-32 rounded-full border-4 border-secondary"
                  />
                  <div className="flex flex-col px-5 gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="flex justify-start items-center gap-3">
                        <span className="font-semibold text-xl">
                          {"User User2"}
                        </span>
                        <span className="px-2 py-1 bg-secondary100 rounded-md text-sm font-medium">
                          {"@usernick"}
                        </span>
                      </span>
                      <div className="flex justify-start items-center gap-2 text-sm">
                        <US
                          title="United States"
                          width={22}
                          height={22}
                          className="rounded-lg"
                        />
                        <span>{"Florida, MI - United States"}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex gap-2 justify-center items-center px-4 py-2 bg-accent hover:bg-accent/80 rounded-md text-sm font-semibold">
                        <PlusIcon width={20} height={20} strokeWidth={2} />
                        Seguir
                      </button>
                      <button className="flex gap-2 justify-center items-center px-4 py-2 border border-secondary100 hover:bg-secondary100/80 rounded-md text-sm font-semibold">
                        <ShareIcon width={20} height={20} strokeWidth={2} />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[400px] bg-secondary rounded-2xl"></div>
              <div className="w-full h-[400px] bg-secondary rounded-2xl"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
