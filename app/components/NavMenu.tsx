
import Image from "next/image";
import Link from "next/link";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import LogoWithText from "@/assets/Logo.svg";
import LogoOnlyText from "@/assets/LogoOnlyText.svg";

import AuthButton from "./AuthButton";
import { CommandMenu } from "./CommandMenu";
import {
  FilmIcon,
  HomeIcon,
  SparklesIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

// export const menuItems = [
//   {
//     link: "/",
//     name: "Home",
//     icon: <HomeIcon width={20} height={20} strokeWidth={2} />,
//   },
//   {
//     link: "/movies",
//     name: "Filmes",
//     icon: <FilmIcon width={20} height={20} strokeWidth={2} />,
//   },
//   {
//     link: "/tvshows",
//     name: "Séries",
//     icon: <TvIcon width={20} height={20} strokeWidth={2} />,
//   },
//   {
//     link: "/animes",
//     name: "Animes",
//     icon: <SparklesIcon width={20} height={20} strokeWidth={2} />,
//   },
// ];

export function NavMenu({ active }: { active: number }) {
  return (
    <nav className="absolute z-50 top-0 w-full flex justify-center items-center pt-10 px-20">
      <div className="w-full flex justify-between items-center text-sm">
        <Link href={"/"} className="flex gap-4 left-slide-in">
        <Image
            src={LogoWithoutText}
            alt="Stream Fusion Logo"
            width={50}
            height={50}
          />
          <Image
            src={LogoOnlyText}
            alt="Stream Fusion Logo"
            width={240}
            height={100}
          />
        </Link>
        {/* <ol className="flex flex-1 justify-center items-center gap-3">
          {menuItems.map((e, index) => (
            <Link
              href={e.link}
              className={`py-2 px-8 ${
                index == active
                  ? "bg-secondary100 text-text"
                  : "hover:bg-secondary100 hover:text-text text-textSecondary"
              }   flex justify-center items-center gap-3 rounded-md font-medium text-base transition duration-150 ease-in-out`}
            >
              {e.icon}{e.name}
            </Link>
          ))}
        </ol> */}
        <div className="flex justify-center items-center gap-4 right-slide-in">
          <CommandMenu />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
