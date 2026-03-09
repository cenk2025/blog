import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Cpu, LogOut } from "lucide-react";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/admin/login");
  };

  return (
    <div className="flex h-screen bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mb-8 flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-accent-cyan/40 to-accent-emerald/35 shadow-glow">
            <Cpu className="h-4 w-4 text-ink-light dark:text-ink-dark" />
          </div>
          <span className="font-display font-semibold tracking-wide">
            Admin Panel
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className="rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className="rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
          >
            Posts
          </Link>
          <Link
            href="/admin/categories"
            className="rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
          >
            Categories
          </Link>
        </nav>

        <div className="absolute bottom-6 w-52">
          <form action={signOut}>
            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-500 transition hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
