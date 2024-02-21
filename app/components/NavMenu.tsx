import Image from "next/image";
import Link from "next/link";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import LogoWithText from "@/assets/Logo.svg";
import LogoOnlyText from "@/assets/LogoOnlyText.svg";

import AuthButton from "./AuthButton";
import { CommandMenu } from "./CommandMenu";
import {
  BellIcon,
  BellSnoozeIcon,
  BookmarkIcon,
  FilmIcon,
  HomeIcon,
  SparklesIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

export function NavMenu({
  withBackground = false,
}: {
  withBackground?: boolean;
}) {
  return (
    <nav
      className={`absolute ${
        withBackground ? "animate-in bg-black pb-2" : ""
      } z-50 top-0 w-full flex justify-center items-center pt-10 pl-20 pr-24`}
    >
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
        <div className="flex justify-center items-center gap-8 right-slide-in">
          <CommandMenu />
          <BellIcon
            width={23}
            height={23}
            strokeWidth={2}
            className="hover:fill-white/90 cursor-pointer"
          />
          <BookmarkIcon
            width={23}
            height={23}
            strokeWidth={2}
            className="hover:fill-white/90 cursor-pointer"
          />

          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
