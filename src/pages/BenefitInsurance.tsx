import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock, ExternalLink, ArrowRight } from "lucide-react";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const whatsIncluded = [
  "Inpatient & day-patient treatment",
  "Outpatient consultations & diagnostics",
  "Mental health — therapy & psychiatry",
  "Cancer treatment & care",
  "24/7 virtual GP access",
  "Optical cover",
];

const notCovered = [
  "Pre-existing conditions (2yr)",
  "Cosmetic procedures",
  "Fertility treatment",
];

const plans = [
  { name: "Individual", desc: "You only · Employer covers £4,200/yr", cost: "£0/mo", badge: "Most chosen" },
  { name: "You + Partner", desc: "You + 1 partner · Employer covers £6,800/yr", cost: "£85/mo", badge: null },
  { name: "Family", desc: "Up to 4 dependants · Employer covers £9,400/yr", cost: "£145/mo", badge: null },
];

export default function BenefitInsurance() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
      {/* Breadcrumb */}
      <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-light">
        <button onClick={() => navigate("/marketplace")} className="hover:text-foreground transition-colors">Benefits</button>
        <span>/</span>
        <span className="text-foreground font-medium">Private Medical Insurance</span>
      </motion.div>

      <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors font-light">
        <ArrowLeft size={16} /> Back to benefits
      </motion.button>

      {/* Title row */}
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <img src={iconHealthInsurance} alt="PMI" className="w-14 h-14 object-contain" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">Private Medical Insurance</h1>
            <span className="happl-badge bg-happl-warning/15 text-happl-warning text-xs flex items-center gap-1">
              <Clock size={10} /> 14d left
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-light">Provided by Bupa · Health & Protection</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="col-span-2 space-y-6">
          {/* About */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-3">About this benefit</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Full private medical cover including inpatient treatment, outpatient consultations, mental health support, cancer care, and 24/7 GP access. Choose a plan that fits your needs.
            </p>
          </motion.div>

          {/* What's included */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">What's included</h2>
            <div className="space-y-3">
              {whatsIncluded.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-light">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">Not covered</p>
              <ul className="space-y-1.5">
                {notCovered.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground/70 font-light flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Choose a plan */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">Choose a plan</h2>
            <div className="space-y-3">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => setSelectedPlan(i)}
                  className={`relative rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                    selectedPlan === i
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 right-4 happl-badge bg-accent text-white text-[10px]">
                      {plan.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === i ? "border-accent" : "border-muted-foreground/30"
                      }`}>
                        {selectedPlan === i && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{plan.name}</p>
                        <p className="text-xs text-muted-foreground font-light">{plan.desc}</p>
                      </div>
                    </div>
                    <p className="text-base font-semibold text-foreground">{plan.cost}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-4">
          {/* Annual value */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-muted-foreground font-light mb-1">Annual value</p>
            <p className="text-3xl font-semibold text-foreground">£4,200</p>
            <p className="text-sm text-muted-foreground font-light mt-1">Your cost: £0/mo</p>
            <div className="mt-3 rounded-lg bg-happl-warning/10 border border-happl-warning/20 px-3 py-2">
              <p className="text-sm font-medium text-happl-warning flex items-center gap-1.5">
                <Clock size={12} /> Closes in 14 days
              </p>
              <p className="text-xs text-muted-foreground font-light mt-0.5">Miss this and wait for next period.</p>
            </div>
          </motion.div>

          {/* Enrol button */}
          <motion.div variants={fadeUp}>
            <button
              onClick={() => navigate("/enroll/health-insurance")}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-medium hover:brightness-110 transition-all"
            >
              Enrol now <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <div className="flex flex-wrap gap-2">
              <span className="happl-badge-muted text-xs">Enrollment window</span>
              <span className="happl-badge-muted text-xs">Salary sacrifice</span>
            </div>
          </motion.div>

          {/* Provider */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-muted-foreground font-light mb-1">Provider</p>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">Bupa</p>
              <ExternalLink size={14} className="text-muted-foreground" />
            </div>
          </motion.div>

          {/* Auto-debit info */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h3 className="font-medium text-foreground mb-3">Payment details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Method</span>
                <span className="text-sm text-foreground">Salary deduction</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Frequency</span>
                <span className="text-sm text-foreground">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Deducted on</span>
                <span className="text-sm text-foreground">25th of each month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Tax benefit</span>
                <span className="text-sm text-accent font-medium">Pre-tax (BIK exempt)</span>
              </div>
            </div>
          </motion.div>

          {/* Contribution breakdown */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h3 className="font-medium text-foreground mb-3">Contribution breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground font-light">Company pays</span>
                  <span className="text-sm font-medium text-foreground">£4,200/yr</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground font-light">You pay</span>
                  <span className="text-sm font-medium text-foreground">£0/yr</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: "0%" }} />
                </div>
              </div>
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="text-sm font-medium text-foreground">Total annual</span>
                <span className="text-sm font-semibold text-foreground">£4,200</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
