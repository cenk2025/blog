export default function Loading() {
  return (
    <div className="space-y-4 py-10">
      <div className="h-7 w-48 animate-pulse rounded-full bg-white/10" />
      <div className="h-24 w-full animate-pulse rounded-3xl bg-white/10" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-48 animate-pulse rounded-3xl bg-white/10" />
        <div className="h-48 animate-pulse rounded-3xl bg-white/10" />
        <div className="h-48 animate-pulse rounded-3xl bg-white/10" />
      </div>
    </div>
  );
}
