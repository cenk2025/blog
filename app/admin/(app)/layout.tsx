import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminNavBar } from "./admin-nav";

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
    const supabaseClient = await createClient();
    await supabaseClient.auth.signOut();
    return redirect("/admin/login");
  };

  return (
    <div className="flex h-screen flex-col bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark md:flex-row">
      <AdminNavBar signOutAction={signOut} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
