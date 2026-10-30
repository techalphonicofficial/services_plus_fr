import { Card } from "../../../components/ui/Card";
const STEPS = [
  {
    number: "01",
    title: "Consultation in the First Place",
    description: "This is to adapt our approach to you. Comprehend your needs and desires well. Our experts analyze your exact regulatory jurisdiction, corporate structure, and registration requirements."
  },
  {
    number: "02",
    title: "Agile Planning & Documentation",
    description: "We prepare digital checklists, draft essential MOA/AOA, partnership deeds, declarations, and verify PAN/Aadhaar/DSC with absolute precision before submission."
  },
  {
    number: "03",
    title: "Execution & Government Filing",
    description: "Our team submits applications directly via the MCA, GST Portal, IP India, or FSSAI FoSCoS portal, continuously resolving queries and filing clarifications."
  },
  {
    number: "04",
    title: "Approval & Lifelong Delivery",
    description: "Receive your Certificate of Incorporation, GSTIN, Trademark Registration Certificate, or License along with recurring compliance alerts and accounting software access."
  }
];
function ProcessSection() {
  return <section className="py-20 bg-sp-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-3">
            Our Proven Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-4">
            How Services Plus Delivers Excellence with Agile Process
          </h2>
          <p className="text-sm sm:text-base text-sp-slate">
            A step-by-step transparent roadmap ensuring hassle-free registration and zero compliance bottlenecks.
          </p>
        </div>

        {
    /* 4 Steps Timeline Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => <Card
    key={step.number}
    className="p-6 relative flex flex-col justify-between group bg-white"
  >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-sp-primary/40 group-hover:text-sp-primary transition-colors">
                    {step.number}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sp-tint text-sp-primary">
                    Step {idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-sp-ink group-hover:text-sp-primary transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-sp-slate leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sp-tint/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-sp-slate">Verified Flow</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
}
export {
  ProcessSection
};
