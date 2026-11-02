import Image from "next/image";

export function ServicesPlusLogo({ variant = "light", className = "" }) {
  const isDark = variant === "dark";
  const src = isDark
    ? "/assets/images/logo-f-6b140866.png"
    : "/assets/images/logo-h-390c5c1a.png";

  return (
    <span
      className={`relative inline-flex items-center shrink-0 select-none ${
        isDark ? "w-44 h-12" : "w-36 lg:w-36 xl:w-44 h-10 xl:h-11"
      } ${className}`}
    >
      <Image
        src={src}
        alt="Services Plus Logo"
        fill
        className="object-contain object-left"
        priority={!isDark}
      />
    </span>
  );
}
