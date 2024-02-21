import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";
import { User } from "@supabase/supabase-js";

export function AvatarButton({
  children,
  user,
}: {
  children: React.JSX.Element;
  user: User;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={10}
        className="w-56 -translate-x-24 border !border-white/20"
      >
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/profile/${user.id}`}>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Lista de Favoritos</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Convidar para lista</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>User 1</DropdownMenuItem>
                <DropdownMenuItem>User 2</DropdownMenuItem>
                <DropdownMenuItem>User 3</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mais...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Nova Lista</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem>Termos de Uso</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <AvatarButton user={user}>
          <button className="relative p-6 gap-1 flex border-2 border-white shadow-xl rounded-full justify-center items-center font-semibold no-underline">
            <Image
              width={200}
              height={200}
              src={
                "https://ebywanavgfdogjmovwss.supabase.co/storage/v1/object/public/avatars/36%20-%20jd8XbdA.png"
              }
              alt="Profile Image"
              className="absolute w-full h-full group-hover/authButtonOut:-translate-x-1 transition-transform rounded-full"
            />
          </button>
        </AvatarButton>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="relative px-8 py-2 rounded-md gap-1 flex bg-accent border-white shadow-xl justify-center items-center font-semibold no-underline group/login"
    >
      <ArrowLeftEndOnRectangleIcon
        width={20}
        height={20}
        strokeWidth={2}
        className="group-hover/login:-translate-x-1 transition-transform"
      />{" "}
      Entrar
    </Link>
  );
}
