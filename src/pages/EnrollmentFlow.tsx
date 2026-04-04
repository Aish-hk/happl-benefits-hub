import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  User,
  Plus,
  Minus,
  Users,
  Shield,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import iconCheckCircle from "@/assets/icons/check-circle.png";

const steps = [
  { label: "Plan Selection", icon: Shield },
  { label: "Dependents", icon: Users },
  { label: "Review & Confirm", icon: CreditCard },
  { label: "Complete", icon: CheckCircle2 },
];

const plans = [
  {
    name: "Essential",
    price: "€0/mo",
    desc: "Company paid basic coverage",
    features: ["In-patient cover", "€500 out-patient", "Emergency care"],
    recommended: false,
  },
  {
    name: "Plus",
    price: "€25/mo",
    desc: "Enhanced coverage with dental",
    features: ["In-patient cover", "€1,500 out-patient", "Dental & Vision", "Mental health"],
    recommended: true,
  },
  {
    name: "Premium",
    price: "€55/mo",
    desc: "Full coverage for you & family",
    features: ["Full in-patient", "Unlimited out-patient", "Dental, Vision & Hearing", "Mental health", "Maternity", "International cover"],
    recommended: false,
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

export default function EnrollmentFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [dependents, setDependents] = useState([{ name: "Emily Smith", relation: "Spouse" }]);
  const [agreed, setAgreed] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#04E898", "#163b3b", "#f5f3ef", "#FFD700"];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const next = () => {
    if (step < 3) {
      setDirection(1);
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep === 3) setTimeout(fireConfetti, 400);
    }
  };
  const back = () => {
    if (step > 0) { setDirection(-1); setStep(step - 1); }
  };

  const addDependent = () => setDependents([...dependents, { name: "", relation: "Child" }]);
  const removeDependent = (i: number) => setDependents(dependents.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-foreground">Enrollment</h1>
            <p className="text-sm text-muted-foreground">Income Protection</p>
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} /> Cancel
        </button>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <motion.div animate={{ backgroundColor: i <= step ? "hsl(157, 97%, 46%)" : "hsl(40, 12%, 88%)" }} className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                {i < step ? <Check size={14} className="text-accent-foreground" /> : <s.icon size={14} className={i === step ? "text-accent-foreground" : "text-muted-foreground"} />}
              </motion.div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-muted">
                <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
          {step === 0 && (
            <div>
              <h2 className="text-xl font-serif text-foreground mb-2">Select your plan</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose the coverage level that works best for you</p>
              <div className="grid grid-cols-3 gap-4">
                {plans.map((plan, i) => (
                  <motion.div key={plan.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPlan(i)} className={`relative happl-card cursor-pointer transition-all ${selectedPlan === i ? "ring-2 ring-accent border-accent" : ""}`}>
                    {plan.recommended && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 happl-badge-accent text-[10px]">Recommended</span>}
                    <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                    <p className="text-2xl font-bold text-foreground mt-1">{plan.price}</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-4">{plan.desc}</p>
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <Check size={12} className="text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    {selectedPlan === i && <motion.div layoutId="selectedPlanRing" className="absolute inset-0 rounded-xl ring-2 ring-accent pointer-events-none" />}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-serif text-foreground mb-2">Add dependents</h2>
              <p className="text-sm text-muted-foreground mb-6">Add family members to cover under your plan</p>
              <div className="space-y-3">
                <div className="happl-card-static flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center"><User size={18} className="text-accent" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Sarah Smith</p>
                    <p className="text-xs text-muted-foreground">Primary member (you)</p>
                  </div>
                  <span className="happl-badge-accent text-xs">Included</span>
                </div>
                {dependents.map((dep, i) => (
                  <motion.div key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="happl-card-static">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><Users size={16} className="text-muted-foreground" /></div>
                        <input value={dep.name} onChange={(e) => { const d = [...dependents]; d[i].name = e.target.value; setDependents(d); }} placeholder="Full name" className="text-sm font-medium text-foreground bg-transparent border-b border-border pb-1 focus:outline-none focus:border-accent" />
                      </div>
                      <button onClick={() => removeDependent(i)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Minus size={14} /></button>
                    </div>
                    <select value={dep.relation} onChange={(e) => { const d = [...dependents]; d[i].relation = e.target.value; setDependents(d); }} className="text-sm text-foreground bg-secondary rounded-md px-3 py-1.5 border-none focus:outline-none focus:ring-2 focus:ring-accent">
                      <option>Spouse</option><option>Child</option><option>Partner</option>
                    </select>
                  </motion.div>
                ))}
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={addDependent} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-accent hover:text-accent transition-all">
                  <Plus size={16} /> Add another dependent
                </motion.button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-serif text-foreground mb-2">Review & Confirm</h2>
              <p className="text-sm text-muted-foreground mb-6">Review your enrollment details before confirming</p>
              <div className="happl-card-static mb-4">
                <h3 className="font-semibold text-foreground mb-4">Enrollment Summary</h3>
                <div className="space-y-3 divide-y divide-border">
                  {[
                    ["Plan", plans[selectedPlan].name],
                    ["Monthly cost", plans[selectedPlan].price],
                    ["Covered members", `${1 + dependents.length} people`],
                    ["Coverage starts", "May 1, 2026"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="happl-card-static mb-4">
                <h3 className="font-semibold text-foreground mb-3">Members</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center"><User size={14} className="text-accent" /></div>
                    <div><p className="text-sm font-medium text-foreground">Sarah Smith</p><p className="text-xs text-muted-foreground">Primary member</p></div>
                  </div>
                  {dependents.map((dep, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><Users size={14} className="text-muted-foreground" /></div>
                      <div><p className="text-sm font-medium text-foreground">{dep.name || "Unnamed"}</p><p className="text-xs text-muted-foreground">{dep.relation}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                <span className="text-sm text-muted-foreground">I confirm the information above is correct and I agree to the <span className="text-accent underline cursor-pointer">terms and conditions</span> of enrollment.</span>
              </label>
            </div>
          )}

          {step === 3 && (
            <motion.div className="text-center py-16" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                <img src={iconCheckCircle} alt="Success" className="w-20 h-20 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-serif text-foreground mb-2">You're all set! 🎉</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Your enrollment in the <strong>{plans[selectedPlan].name}</strong> plan has been submitted. Coverage begins May 1, 2026.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => navigate("/")} className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:brightness-95 transition-all">Back to Home</button>
                <button onClick={() => navigate("/marketplace")} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-all">Explore More Benefits</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step < 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <button onClick={back} disabled={step === 0} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={next} disabled={step === 2 && !agreed} className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            {step === 2 ? "Confirm Enrollment" : "Continue"} <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
