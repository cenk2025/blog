import { dictionaries } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const fi = dictionaries.fi.notFound;
  const en = dictionaries.en.notFound;

  return (
    <main className="container-apple flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <Image src="/brand/voon-mark-color.png" alt="VOON IQ" width={72} height={65} />
      <p className="t-eyebrow mt-8">404</p>
      <h1 className="t-headline mt-3">{fi.title}</h1>
      <p className="t-sub mt-4">{fi.text}</p>
      <p className="mt-2 text-[17px] text-fg-3">{en.text}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/fi" className="btn btn-primary">
          {fi.cta}
        </Link>
        <Link href="/en" className="btn btn-secondary text-fg">
          {en.cta}
        </Link>
      </div>
    </main>
  );
}
