import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

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
        <button className="relative p-8 gap-1 flex border-2 border-white shadow-xl rounded-full justify-center items-center font-semibold no-underline">
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
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="relative p-8 gap-1 flex border-2 border-white shadow-xl rounded-full justify-center items-center font-semibold no-underline"
    >
      <Image
        width={200}
        height={200}
        src={
          "https://ebywanavgfdogjmovwss.supabase.co/storage/v1/object/public/avatars/36%20-%20jd8XbdA.png"
        }
        alt="Profile Image"
        className="absolute w-full h-full group-hover/authButtonOut:-translate-x-1 transition-transform rounded-full"
      />
    </Link>
  );
}
