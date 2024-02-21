import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon} from  "@heroicons/react/24/outline"

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
        <button className="py-2 px-8 gap-1 flex font-semibold rounded-md no-underline bg-accent hover:bg-accent/90 group/authButtonOut">
          <ArrowRightEndOnRectangleIcon width={20} height={20} strokeWidth={2} className="group-hover/authButtonOut:-translate-x-1 transition-transform"/> Sair
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-8 gap-1 flex justify-center items-center font-semibold rounded-md no-underline bg-accent hover:bg-accent/90 group/authButtonIn"
    >
      <ArrowLeftEndOnRectangleIcon width={20} height={20} strokeWidth={2} className="group-hover/authButtonIn:-translate-x-1 transition-transform"/> Entrar
    </Link>
  );
}
