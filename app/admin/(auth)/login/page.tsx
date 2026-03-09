import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "./submit-button";

export default async function Login({
  searchParams
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/admin");
  }

  const { message } = await searchParams;

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login attempt failed:", error);
      return redirect("/admin/login?message=Could not authenticate user");
    }

    return redirect("/admin");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <div className="mb-6 flex flex-col items-center">
          <h1 className="font-display text-2xl font-semibold tracking-wide text-ink-light dark:text-ink-dark">
            Futureframe Admin
          </h1>
          <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">
            Sign in to manage your blog
          </p>
        </div>

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
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
          className="bg-accent-cyan/20 border border-accent-cyan/35 text-ink-dark hover:bg-accent-cyan/30 rounded-md px-4 py-2 mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        {message && (
          <p className="mt-4 p-4 bg-red-500/10 text-red-500 text-center rounded-md text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
