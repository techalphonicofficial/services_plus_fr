import { Layers, Zap, Sliders, ShieldCheck } from "lucide-react";
import { Card } from "../../../components/ui/Card";
const REASONS = [
  {
    title: "The Expansive Ability in Industry",
    description: "Spanning 100+ services across incorporation, taxation, IP protection, and industrial licensing. Our multi-disciplinary team handles complex legal frameworks effortlessly.",
    icon: Layers,
    colSpan: "lg:col-span-2"
  },
  {
    title: "Agile and Transparent Approach",
    description: "No surprise fees or bureaucratic delays. Track application milestones in real-time with continuous progress notifications and dedicated advisor support.",
    icon: Zap,
    colSpan: "lg:col-span-1"
  },
  {
    title: "Tailored, Unique Solutions",
    description: "Every business is distinct. Whether you are a solo entrepreneur starting a boutique agency or an international subsidiary scaling in Delhi NCR, we craft bespoke compliance plans.",
    icon: Sliders,
    colSpan: "lg:col-span-1"
  },
  {
    title: "Proper Support and Assurance in Quality",
    description: "Backed by ISO 9001:2015 quality standards, prompt WhatsApp query resolution, and error-free regulatory submissions verified by seasoned CAs and CS.",
    icon: ShieldCheck,
    colSpan: "lg:col-span-2"
  }
];
function WhyUsSection() {
  return <section className="py-20 bg-white border-y border-sp-tint/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-3">
            The Plus Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-4">
            Reasons Why Services Plus Is the Best Technology Partner
          </h2>
          <p className="text-sm sm:text-base text-sp-slate">
            We blend legal domain mastery with rapid digital processing to give your enterprise unprecedented peace of mind.
          </p>
        </div>

        {
    /* Bento Grid */
  }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
    const Icon = reason.icon;
    return <Card
      key={reason.title}
      className={`p-8 flex flex-col justify-between group ${reason.colSpan}`}
    >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sp-tint/70 text-sp-primary flex items-center justify-center mb-6 group-hover:bg-sp-primary group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-sp-slate leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-sp-tint/60 flex items-center justify-between text-xs font-mono text-sp-slate">
                  <span>Services Plus Verified</span>
                  <span className="text-sp-primary font-bold text-base">+</span>
                </div>
              </Card>;
  })}
        </div>
      </div>
    </section>;
}
export {
  WhyUsSection
};
