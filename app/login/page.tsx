import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";

import Logo from "@/assets/Logo.svg";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Não Foi Possível Autenticar Usuário");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Não Foi Possível Autenticar Usuário");
    }

    return redirect(
      "/login?message=Verifique o Email para proseguir com o login"
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg justify-center gap-2 overflow-hidden">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline font-semibold text-text bg-accent hover:bg-accent/90 flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Voltar
      </Link>

      <form className="animate-in bg-btn-background flex flex-col w-full justify-center rounded-3xl shadow-xl border border-gray-700/20 p-10 gap-16 text-foreground">
        <div className="flex justify-center items-center">
          <Image src={Logo} alt="Stream Fusion Logo" width={250} height={250} />
        </div>
        <div className="flex-1 flex flex-col w-full justify-center gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="nome@email.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Senha
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Entrando..."
          >
            Login
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Cadastrando..."
          >
            Cadastrar-se
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
