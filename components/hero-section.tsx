import { Dictionary, Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export function HeroSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-apple pb-14 pt-16 text-center md:pb-20 md:pt-24">
        <p className="t-eyebrow fade-up">{dict.hero.eyebrow}</p>
        <h1 className="t-hero fade-up mx-auto mt-4 max-w-4xl max-sm:text-[2.625rem] [animation-delay:80ms]">{dict.hero.title}</h1>
        <p className="t-sub fade-up mx-auto mt-6 max-w-2xl [animation-delay:160ms]">{dict.hero.intro}</p>
        <div className="fade-up mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
          <Link href={`/${locale}/blog`} className="btn btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
          <Link href={`/${locale}/categories`} className="btn btn-secondary text-fg">
            {dict.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="container-wide">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[34px] md:aspect-[2/1]">
          <Image
            src="/images/covers/default.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="focus-in object-cover"
          />
          <div className="glass absolute bottom-4 left-4 flex items-center gap-3 rounded-[22px] py-2.5 pl-2.5 pr-5 md:bottom-8 md:left-8">
            <span className="relative h-11 w-11 overflow-hidden rounded-full">
              <Image src="/images/author.jpg" alt="Cenk Yakinlar" fill sizes="44px" className="object-cover" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[17px] font-semibold">Cenk Yakinlar</span>
              <span className="block text-[14px] text-[#6e6e73]">Founder & CEO, VOON IQ</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
