import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Shield, CreditCard, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import iconCheckCircle from "@/assets/icons/check-circle.png";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";

const steps = [
  { label: "Your details", icon: Shield },
  { label: "How to pay", icon: CreditCard },
  { label: "Review", icon: CheckCircle2 },
  { label: "Confirmed", icon: CheckCircle2 },
];

const paymentOptions = [
  { id: "salary", title: "Deduct from my salary", desc: "We'll deduct the monthly cost from your payslip before tax (salary sacrifice).", icon: "💼", tag: "Tax saving" },
  { id: "wellbeing", title: "Use my Wellbeing Card", desc: "We'll cover the cost using your wellbeing or flex allowance balance.", icon: "💳", tag: null },
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
  const [selectedPayment, setSelectedPayment] = useState("salary");
  const [agreed, setAgreed] = useState(false);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 2000;
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

  const stepLabels = ["Your details", "How to pay", "Review", "Confirmed"];

  return (
    <div className="max-w-[700px] mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-light">
        <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">Benefits</button>
        <span>/</span>
        <span className="font-medium text-foreground">Enrollment</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors font-light">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-2xl text-foreground">Enrol in Private Medical Insurance</h1>
      </motion.div>

      {/* Step indicator — numbered circles */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center gap-0">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i < step ? "bg-accent text-accent-foreground" :
                  i === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-[11px] ${i <= step ? "text-foreground font-medium" : "text-muted-foreground font-light"}`}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`h-0.5 flex-1 -mt-5 mx-1 rounded-full transition-all ${i < step ? "bg-accent" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>

          {/* Step 0 — Your details */}
          {step === 0 && (
            <div>
              <h2 className="text-lg text-foreground mb-1">Confirm your details</h2>
              <p className="text-sm text-muted-foreground mb-6 font-light">Make sure your personal information is correct</p>

              <div className="happl-card-static mb-4">
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-border">
                  <img src={iconHealthInsurance} alt="Health" className="w-20 h-20 object-contain" />
                  <div>
                    <h3 className="font-medium text-foreground">Private Medical Insurance</h3>
                    <p className="text-sm text-muted-foreground font-light">Bupa · Comprehensive PMI</p>
                    <span className="happl-badge bg-accent/15 text-accent text-[10px] mt-1">€0/mo · Company paid</span>
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-4">Your details</h3>
                <div className="space-y-4">
                  {[
                    { label: "Full name", value: "Sarah Mitchell" },
                    { label: "Date of birth", value: "15/03/1992" },
                    { label: "Employee ID", value: "EMP-4821" },
                    { label: "NI number", value: "••••••1234" },
                  ].map((field) => (
                    <div key={field.label}>
                      <p className="text-xs text-muted-foreground mb-1 font-light">{field.label}</p>
                      <p className="text-sm font-medium text-foreground bg-secondary/50 rounded-lg px-4 py-2.5">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — How to pay */}
          {step === 1 && (
            <div>
              <h2 className="text-lg text-foreground mb-1">How would you like to pay?</h2>
              <p className="text-sm text-muted-foreground mb-6 font-light">Choose how to cover the €0/mo cost</p>
              <div className="space-y-3">
                {paymentOptions.map((opt) => (
                  <motion.div key={opt.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelectedPayment(opt.id)}
                    className={`happl-card-static cursor-pointer flex items-start gap-4 transition-all ${selectedPayment === opt.id ? "ring-2 ring-accent border-accent" : ""}`}>
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPayment === opt.id ? "border-accent bg-accent" : "border-border"}`}>
                      {selectedPayment === opt.id && <Check size={12} className="text-accent-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{opt.icon}</span>
                        <h3 className="font-medium text-foreground">{opt.title}</h3>
                        {opt.tag && <span className="happl-badge bg-accent/15 text-accent text-[10px]">{opt.tag}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 font-light">{opt.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div>
              <h2 className="text-lg text-foreground mb-1">Review & Confirm</h2>
              <p className="text-sm text-muted-foreground mb-6 font-light">Check everything before submitting</p>
              <div className="happl-card-static mb-4">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                  <img src={iconHealthInsurance} alt="Health" className="w-20 h-20 object-contain" />
                  <div>
                    <h3 className="font-medium text-foreground">Private Medical Insurance</h3>
                    <p className="text-sm text-muted-foreground font-light">Bupa · Comprehensive PMI</p>
                  </div>
                </div>
                <div className="space-y-0 divide-y divide-border">
                  {[
                    ["Employee", "Sarah Mitchell (EMP-4821)"],
                    ["Payment method", selectedPayment === "salary" ? "Salary deduction" : "Wellbeing Card"],
                    ["Monthly cost", "€0/mo (company paid)"],
                    ["Coverage starts", "May 1, 2026"],
                    ["Coverage type", "Comprehensive PMI"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3">
                      <span className="text-sm text-muted-foreground font-light">{label}</span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mt-4">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                <span className="text-sm text-muted-foreground font-light">I confirm the information above is correct and I agree to the <span className="text-accent underline cursor-pointer">terms and conditions</span></span>
              </label>
            </div>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <motion.div className="text-center py-16" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                <img src={iconCheckCircle} alt="Success" className="w-32 h-32 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl text-foreground mb-2">You're all set! 🎉</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto font-light">Your enrollment in Private Medical Insurance has been submitted. Coverage begins May 1, 2026.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => navigate("/")} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">Back to Home</button>
                <button onClick={() => navigate("/marketplace")} className="px-6 py-2.5 rounded-lg border border-border text-sm font-light text-foreground hover:bg-secondary transition-all">Explore More Benefits</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <button onClick={back} disabled={step === 0} className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-sm font-light text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ArrowLeft size={16} /> Back
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={next}
            disabled={step === 2 && !agreed}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {step === 2 ? "Confirm Enrollment" : "Continue"} <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
