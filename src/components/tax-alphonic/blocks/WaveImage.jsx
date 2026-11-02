// Hero image in the Services Plus "wave" style (admin: Hero → Image style → Wave): the photo fills the
// hero height with rounded outer corners, and an S-curve cuts its inner edge. The cut is a CSS mask on
// the photo (not a shape painted in a page colour), so the hero's own background shows through it.
// side = where the image sits; the wave is always on the text side. Styles: servicesplus-theme.css.
export default function WaveImage({ src, alt = "", side = "right" }) {
  return (
    <div className={`sp-wave-img sp-wave-${side === "left" ? "left" : "right"}`}>
      {/* CMS images come from arbitrary hosts, so next/image remotePatterns can't cover them. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <svg className="sp-wave-cut" viewBox="0 0 340 800" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 165,0 C 200,130 185,230 105,360 C 25,490 35,640 220,800" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
