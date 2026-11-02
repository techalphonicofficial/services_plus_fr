import { Button } from "../../../components/ui/Button";
import { RegistrationMarks } from "../../../components/ui/Card";
import { MessageCircle, Phone } from "lucide-react";

function CtaBand() {
  return (
    <section className="py-16 bg-sp-bg">
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="relative rounded-sp-lg bg-sp-navy text-white border border-sp-primary/40 shadow-sp-lift p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 overflow-hidden">
          <div className="absolute inset-0 sp-plus-pattern pointer-events-none opacity-40" />
          <RegistrationMarks variant="navy" />

          <div className="max-w-2xl space-y-2.5 relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-sky flex items-center gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">+</span>
              <span>Direct Advisory Dispatch</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-[-0.02em] leading-[1.12]">
              Not sure which business structure or license applies to you?
            </h2>
            <p className="text-base text-white/75 leading-[1.6] max-w-[58ch]">
              Speak directly with our Noida advisory desk for a clear breakdown of statutory requirements, timelines, and government fees.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 relative z-10">
            <Button
              href="/contact"
              size="md"
              showPlus
              className="bg-white text-sp-navy hover:bg-sp-sky border-white"
            >
              Request Callback
            </Button>
            <Button
              href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20looking%20for%20assistance%20with%20company%20registration%20or%20tax%20filing."
              variant="navy"
              size="md"
              external
            >
              <MessageCircle className="w-4 h-4 text-sp-sky" />
              <span>WhatsApp Desk</span>
            </Button>
            <Button href="tel:+918800028794" variant="navy" size="md">
              <Phone className="w-4 h-4 text-sp-sky" />
              <span className="tabular-nums">(+91) 88000 28794</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CtaBand };
