import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, ExternalLink } from "lucide-react";
import TierBadge from "@/components/TierBadge";
import AnimatedCounter from "@/components/AnimatedCounter";
import { benefitsData } from "@/lib/benefits-data";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function BenefitDetail() {
  const { benefitId } = useParams<{ benefitId: string }>();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(0);

  const benefit = benefitId ? benefitsData[benefitId] : null;

  if (!benefit) {
    return (
      <div className="w-full text-center py-20">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Benefit not found</h1>
        <p className="text-muted-foreground font-light mb-4">The benefit you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/marketplace")} className="text-accent hover:underline">Back to Benefits</button>
      </div>
    );
  }

  const isAllowance = !!benefit.allowance;
  const isEnrollable = benefit.status === "available" || benefit.status === "enrollment";
  const isActive = benefit.status === "active" || benefit.status === "enrolled";

  const statusBadge = isActive
    ? { label: "Active", color: "bg-accent/15 text-accent" }
    : benefit.status === "enrollment"
    ? { label: `${benefit.enrollmentDeadline} left`, color: "bg-happl-warning/15 text-happl-warning" }
    : { label: "Available", color: "bg-muted text-muted-foreground" };

  const statusIcon = isActive ? <Check size={10} /> : benefit.status === "enrollment" ? <Clock size={10} /> : null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
      {/* Breadcrumb */}
      <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-light">
        <button onClick={() => navigate("/marketplace")} className="hover:text-foreground transition-colors">Benefits</button>
        <span>/</span>
        <span className="text-foreground font-medium">{benefit.title}</span>
      </motion.div>

      <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors font-light">
        <ArrowLeft size={16} /> Back to benefits
      </motion.button>

      {/* Title row */}
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <img src={benefit.icon} alt={benefit.title} className="w-14 h-14 object-contain" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{benefit.title}</h1>
            <TierBadge tier={benefit.tier} />
            <span className={`happl-badge ${statusBadge.color} text-xs flex items-center gap-1`}>
              {statusIcon} {statusBadge.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-light">Provided by {benefit.provider} · {benefit.category === "allowance" ? "Allowances" : benefit.category === "insurance" ? "Insurance" : benefit.category === "company" ? "Company" : benefit.category === "pension-gov" ? "Pension & Gov" : "Salary Sacrifice"}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-2 space-y-6">
          {/* About */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-3">{isAllowance ? "About" : "About this benefit"}</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
          </motion.div>

          {/* Balance (allowance only) */}
          {isAllowance && benefit.allowance && (
            <motion.div variants={fadeUp} className="happl-card-static">
              <h2 className="font-semibold text-foreground mb-4">Balance</h2>
              <div className="flex items-baseline gap-3 mb-2">
                <AnimatedCounter value={benefit.allowance.total - benefit.allowance.spent} prefix="£" className="text-3xl font-semibold text-foreground" />
                <span className="text-sm text-muted-foreground font-light">of £{benefit.allowance.total} remaining</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${((benefit.allowance.total - benefit.allowance.spent) / benefit.allowance.total) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-light">£{benefit.allowance.spent} spent · {benefit.allowance.resets}</p>
            </motion.div>
          )}

          {/* What's included */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">{isAllowance ? "Eligible categories" : "What's included"}</h2>
            {isAllowance && benefit.eligibleCategories ? (
              <div className="flex flex-wrap gap-2">
                {benefit.eligibleCategories.map((cat) => (
                  <span key={cat} className="happl-badge-muted text-xs">{cat}</span>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {benefit.included.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-accent" />
                      </div>
                      <span className="text-sm text-foreground font-light">{item}</span>
                    </div>
                  ))}
                </div>
                {benefit.notCovered && benefit.notCovered.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Not covered</p>
                    <ul className="space-y-1.5">
                      {benefit.notCovered.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground/70 font-light flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Plans (if any) */}
          {benefit.plans && benefit.plans.length > 0 && (
            <motion.div variants={fadeUp} className="happl-card-static">
              <h2 className="font-semibold text-foreground mb-4">Choose a plan</h2>
              <div className="space-y-3">
                {benefit.plans.map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    whileHover={{ scale: 1.005 }}
                    onClick={() => setSelectedPlan(i)}
                    className={`relative rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                      selectedPlan === i ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
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
          )}

          {/* Transactions (allowance only) */}
          {isAllowance && benefit.transactions && benefit.transactions.length > 0 && (
            <motion.div variants={fadeUp} className="happl-card-static">
              <h2 className="font-semibold text-foreground mb-4">Recent transactions</h2>
              <div className="divide-y divide-border">
                {benefit.transactions.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground font-light">{tx.date}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      -£{Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Value card */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-accent font-medium mb-1">{isAllowance ? "Annual allowance" : "Annual value"}</p>
            <p className="text-3xl font-semibold text-foreground">{benefit.annualValue}</p>
            <p className="text-sm text-muted-foreground font-light mt-1">Your cost: {benefit.monthlyCost}</p>
            {benefit.enrollmentDeadline && (
              <div className="mt-3 rounded-lg bg-happl-warning/10 border border-happl-warning/20 px-3 py-2">
                <p className="text-sm font-medium text-happl-warning flex items-center gap-1.5">
                  <Clock size={12} /> Closes in {benefit.enrollmentDeadline}
                </p>
                <p className="text-xs text-muted-foreground font-light mt-0.5">Miss this and wait for next period.</p>
              </div>
            )}
            {isAllowance && benefit.allowance && (
              <p className="text-xs text-muted-foreground font-light mt-2">{benefit.allowance.creditSchedule}</p>
            )}
          </motion.div>

          {/* Enrol / Status */}
          {isEnrollable ? (
            <motion.div variants={fadeUp}>
              <button
                onClick={() => navigate(`/enroll/${benefit.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-medium hover:brightness-110 transition-all"
              >
                Enrol now <ArrowRight size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} className="rounded-xl bg-accent/10 border border-accent/20 px-5 py-4">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-accent">You're enrolled</p>
                  <p className="text-xs text-muted-foreground font-light">Active since Jan 2026</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <div className="flex flex-wrap gap-2">
              {benefit.tags.map((tag) => (
                <span key={tag} className="happl-badge-muted text-xs">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Provider */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-muted-foreground font-light mb-1">Provider</p>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">{benefit.provider}</p>
              <ExternalLink size={14} className="text-muted-foreground" />
            </div>
          </motion.div>

          {/* Payment details */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h3 className="font-medium text-foreground mb-3">Payment details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Method</span>
                <span className="text-sm text-foreground">{benefit.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">{isAllowance ? "Credited" : "Frequency"}</span>
                <span className="text-sm text-foreground">{benefit.paymentFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Your cost</span>
                <span className="text-sm text-accent font-medium">
                  {benefit.youPay === "£0/yr" || benefit.youPay === "£0" ? "£0 — employer funded" : benefit.youPay}
                </span>
              </div>
              {benefit.taxBenefit && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-light">Tax benefit</span>
                  <span className="text-sm text-accent font-medium">{benefit.taxBenefit}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contribution breakdown */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h3 className="font-medium text-foreground mb-3">Contribution breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground font-light">Company pays</span>
                  <span className="text-sm font-medium text-foreground">{benefit.companyPays}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: benefit.youPay === "£0/yr" || benefit.youPay === "£0" ? "100%" : "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground font-light">You pay</span>
                  <span className="text-sm font-medium text-foreground">{benefit.youPay}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: benefit.youPay === "£0/yr" || benefit.youPay === "£0" ? "0%" : "40%" }} />
                </div>
              </div>
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="text-sm font-medium text-foreground">Total annual</span>
                <span className="text-sm font-semibold text-foreground">{benefit.annualValue}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
