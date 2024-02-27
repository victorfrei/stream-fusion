import Image from "next/image";
import Link from "next/link";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import LogoOnlyText from "@/assets/LogoOnlyText.svg";

import SearchInput from "./SearchInput";

export function NavMenu({ withSearch = true }: { withSearch?: boolean }) {
  return (
    <nav
      className={`absolute animate-in z-50 top-0 w-full flex justify-center items-center pt-10 pl-20 pr-24`}
    >
      <div className="w-full flex justify-between items-center text-sm">
        <Link href={"/"} className="flex gap-4 left-slide-in">
          <Image
            src={LogoWithoutText}
            alt="Stream Fusion Logo"
            width={30}
            height={30}
          />
          <Image
            src={LogoOnlyText}
            alt="Stream Fusion Logo"
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
