"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, LogOut, Menu, X } from "lucide-react";

export function AdminNavBar({ signOutAction }: { signOutAction: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.02] md:hidden">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-accent-cyan/40 to-accent-emerald/35 shadow-glow">
            <Cpu className="h-4 w-4 text-ink-light dark:text-ink-dark" />
          </div>
          <span className="font-display font-semibold tracking-wide">
            Admin Panel
          </span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-black/5 bg-canvas-light p-6 transition-transform dark:border-white/10 dark:bg-canvas-dark md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-accent-cyan/40 to-accent-emerald/35 shadow-glow">
              <Cpu className="h-4 w-4 text-ink-light dark:text-ink-dark" />
            </div>
            <span className="font-display font-semibold tracking-wide">
              Admin Panel
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className={`rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${pathname === '/admin' ? 'bg-black/5 font-medium dark:bg-white/10' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            onClick={() => setIsOpen(false)}
            className={`rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${pathname?.startsWith('/admin/posts') ? 'bg-black/5 font-medium dark:bg-white/10' : ''}`}
          >
            Posts
          </Link>
          <Link
            href="/admin/categories"
            onClick={() => setIsOpen(false)}
            className={`rounded-lg px-4 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${pathname?.startsWith('/admin/categories') ? 'bg-black/5 font-medium dark:bg-white/10' : ''}`}
          >
            Categories
          </Link>
        </nav>

        <div className="absolute bottom-6 w-[calc(100%-3rem)]">
          <form action={signOutAction}>
            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-500 transition hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
