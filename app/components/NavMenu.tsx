import Image from "next/image";
import Link from "next/link";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import LogoOnlyText from "@/assets/LogoOnlyText.svg";

import SearchInput from "./SearchInput";

export function NavMenu({ withSearch = true }: { withSearch?: boolean }) {
  return (
    <nav
      className={`absolute animate-in z-50 top-0 w-full flex justify-center items-center lg:pt-10 pt-16 px-5 lg:pl-20 lg:pr-24`}
    >
      <div className="w-full flex justify-between items-center text-sm">
        <Link href={"/"} className="flex gap-4 left-slide-in">
          <Image
            src={LogoWithoutText}
            alt="Stream Fusion Logo"
            className="w-12 h-12 lg:w-10 lg:h-10"
            width={30}
            height={30}
          />
          <Image
            src={LogoOnlyText}
            alt="Stream Fusion Logo"
            className="hidden lg:block"
            width={200}
            height={100}
          />
        </Link>
        {withSearch && (
          <div className="flex justify-center items-center gap-2 right-slide-in">
            <SearchInput />
            {/* <AlertButton /> */}
            {/* <ProfileButton /> */}
          </div>
        )}
      </div>
    </nav>
  );
}
