import Image from "next/image";

// Real VOON IQ wordmark: colour on light, white on dark (never typed text).
export function Logo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/voon-logo-color.png"
        alt="VOON IQ"
        width={1902}
        height={537}
        priority
        className={`${className} dark:hidden`}
      />
      <Image
        src="/brand/voon-logo-white.png"
        alt="VOON IQ"
        width={1662}
        height={470}
        priority
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
