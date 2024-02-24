import Image from "next/image";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 w-screen h-screen justify-center items-center">
      <Image
        src={LogoWithoutText}
        alt="Stream Fusion Logo"
        width={60}
        height={60}
        className="animate-spin"
      />
      <span className="text-lg font-semibold">Loading</span>
    </div>
  );
}
