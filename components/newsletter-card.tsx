import { Dictionary } from "@/lib/i18n";
import Image from "next/image";

// Black CTA band with a gradient pill, as in the VOON IQ email/web templates.
export function NewsletterCard({ dict }: { dict: Dictionary }) {
  return (
    <div className="relative overflow-hidden rounded-[34px] bg-black px-7 py-14 text-[#f5f5f7] md:px-16 md:py-20">
      <Image
        src="/brand/voon-mark-color.png"
        alt=""
        width={1564}
        height={1420}
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 h-auto w-72 opacity-[0.14] md:w-[26rem]"
      />
      <div className="relative max-w-2xl">
        <h2 className="t-title text-[#f5f5f7]">{dict.home.newsletterTitle}</h2>
        <p className="mt-4 text-[19px] leading-[1.45] text-[#a1a1a6]">{dict.home.newsletterSubtitle}</p>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            aria-label={dict.home.newsletterPlaceholder}
            type="email"
            required
            placeholder={dict.home.newsletterPlaceholder}
            className="h-[52px] flex-1 rounded-full bg-[#1d1d1f] px-6 text-[17px] text-[#f5f5f7] outline-none ring-1 ring-[#424245] transition placeholder:text-[#86868b] focus:ring-[#ff5a7f]"
          />
          <button type="submit" className="btn btn-primary h-[52px] px-7">
            {dict.home.newsletterButton}
          </button>
        </form>
      </div>
    </div>
  );
}
