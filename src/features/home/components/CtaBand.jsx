import { Button } from "../../../components/ui/Button";
import { MessageCircle, ShieldCheck } from "lucide-react";
function CtaBand() {
  return <section className="py-20 sp-navy-gradient text-white relative overflow-hidden">
      {
    /* Decorative subtle plus pattern */
  }
      <div className="absolute inset-0 sp-plus-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sp-sky text-xs font-mono mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Prompt Legal Assistance Guaranteed</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Maximize your results while minimizing constraints with our solutions
        </h2>

        <p className="text-base sm:text-lg text-sp-sky max-w-2xl mx-auto mb-10 leading-relaxed">
          No matter what your business needs, we connect you with verified legal, tax, and intellectual property experts to make your enterprise compliant and ready to scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/user-register" size="lg" showPlus className="bg-white text-sp-primary hover:bg-sp-bg">
            Get Started Now
          </Button>

          <Button
    href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20looking%20for%20assistance%20with%20company%20registration%20or%20tax%20filing."
    variant="outline"
    size="lg"
    external
    className="border-sp-sky/40 text-white hover:bg-white/10 bg-transparent"
  >
            <MessageCircle className="w-4 h-4 text-emerald-400 mr-2" />
            Talk on WhatsApp (+91 88000 28794)
          </Button>
        </div>
      </div>
    </section>;
}
export {
  CtaBand
};
