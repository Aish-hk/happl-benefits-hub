import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const eligibleCategories = [
  "Gym & fitness", "Mental health", "Sports equipment", "Massage & physio", "Wellness retreats",
];

const transactions = [
  { desc: "PureGym", date: "28 Mar", amount: -29.99 },
  { desc: "Headspace", date: "15 Mar", amount: -9.99 },
  { desc: "Sweaty Betty", date: "2 Mar", amount: -65.00 },
  { desc: "Barry's Bootcamp", date: "18 Feb", amount: -24.00 },
];

export default function BenefitAllowance() {
  const navigate = useNavigate();
  const spent = 150;
  const total = 600;
  const remaining = total - spent;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
      {/* Breadcrumb */}
      <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-light">
        <button onClick={() => navigate("/marketplace")} className="hover:text-foreground transition-colors">Benefits</button>
        <span>/</span>
        <span className="text-foreground font-medium">Wellbeing Allowance</span>
      </motion.div>

      <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors font-light">
        <ArrowLeft size={16} /> Back to benefits
      </motion.button>

      {/* Title row */}
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <img src={iconFlexAllowance} alt="Wellbeing Allowance" className="w-14 h-14 object-contain" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">Wellbeing Allowance</h1>
            <span className="happl-badge bg-accent/15 text-accent text-xs flex items-center gap-1">
              <Check size={10} /> Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-light">Provided by Happl Spend · Allowances</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="col-span-2 space-y-6">
          {/* About */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-3">About</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Monthly budget for gym, fitness, mental health apps, wellness retreats, and sports equipment. Spend via Happl card or claim receipts.
            </p>
          </motion.div>

          {/* Balance */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">Balance</h2>
            <div className="flex items-baseline gap-3 mb-2">
              <AnimatedCounter value={remaining} prefix="£" className="text-3xl font-semibold text-foreground" />
              <span className="text-sm text-muted-foreground font-light">of £{total} remaining</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(remaining / total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-light">£{spent} spent · Resets Jan 2027</p>
          </motion.div>

          {/* Eligible categories */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">Eligible categories</h2>
            <div className="flex flex-wrap gap-2">
              {eligibleCategories.map((cat) => (
                <span key={cat} className="happl-badge-muted text-xs">{cat}</span>
              ))}
            </div>
          </motion.div>

          {/* Recent transactions */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h2 className="font-semibold text-foreground mb-4">Recent transactions</h2>
            <div className="divide-y divide-border">
              {transactions.map((tx, i) => (
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
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-4">
          {/* Annual allowance */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-accent font-medium mb-1">Annual allowance</p>
            <p className="text-3xl font-semibold text-foreground">£600</p>
            <p className="text-sm text-muted-foreground font-light mt-1">£50/month</p>
            <p className="text-xs text-muted-foreground font-light mt-0.5">Auto-credited on 1st of each month</p>
          </motion.div>

          {/* Enrolled status */}
          <motion.div variants={fadeUp} className="rounded-xl bg-accent/10 border border-accent/20 px-5 py-4">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-accent" />
              <div>
                <p className="text-sm font-medium text-accent">You're enrolled</p>
                <p className="text-xs text-muted-foreground font-light">Active since Jan 2026</p>
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <div className="flex flex-wrap gap-2">
              <span className="happl-badge-muted text-xs">Flex card</span>
              <span className="happl-badge-muted text-xs">Active</span>
            </div>
          </motion.div>

          {/* Provider */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <p className="text-xs text-muted-foreground font-light mb-1">Provider</p>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">Happl Spend</p>
              <ExternalLink size={14} className="text-muted-foreground" />
            </div>
          </motion.div>

          {/* Payment info */}
          <motion.div variants={fadeUp} className="happl-card-static">
            <h3 className="font-medium text-foreground mb-3">Payment details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Method</span>
                <span className="text-sm text-foreground">Happl Flex Card</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Credited</span>
                <span className="text-sm text-foreground">1st of month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-light">Your cost</span>
                <span className="text-sm text-accent font-medium">£0 — employer funded</span>
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
                  <span className="text-sm font-medium text-foreground">£600/yr</span>
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
                <span className="text-sm font-semibold text-foreground">£600</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
