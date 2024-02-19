import Image from "next/image";
import Link from "next/link";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import AuthButton from "./AuthButton";

export function NavMenu({ active }: { active: number }) {
  const menuItems = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/categories",
      name: "Categorias",
    },
    {
      link: "/movies",
      name: "Filmes",
    },
    {
      link: "/tvshows",
      name: "Séries",
    },
    {
      link: "/animes",
      name: "Animes",
    },
  ];

  return (
    <nav className="w-full flex justify-center items-center">
      <div className="w-full flex justify-between items-center py-6 px-12 text-sm">
        <div className="flex gap-20">
          <Link href={"/"}>
            <Image
              src={LogoWithoutText}
              alt="Stream Fusion Logo"
              width={50}
              height={50}
            />
          </Link>
          <ol className="flex justify-center items-center gap-3">
            {menuItems.map((e, index) => (
              <Link
                href={e.link}
                className={`w-40 h-12 ${
                  index == active
                    ? "bg-secondary100 text-textSecondary"
                    : "hover:bg-secondary100 hover:text-text"
                }   flex justify-center items-center rounded-md font-semibold text-lg`}
              >
                {e.name}
              </Link>
            ))}
          </ol>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
