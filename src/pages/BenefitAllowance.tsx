import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const spendingCategories = [
  { label: "Fitness & Gym", icon: "🏋️", spent: 65, color: "bg-accent/15" },
  { label: "Food & Nutrition", icon: "🍽️", spent: 35, color: "bg-happl-warning/15" },
  { label: "Learning", icon: "📚", spent: 20, color: "bg-happl-info/15" },
  { label: "Equipment", icon: "🖥️", spent: 30, color: "bg-[#A855F7]/15" },
];

const transactions = [
  { desc: "Gym Membership — FitZone", amount: -45, date: "Apr 2", category: "Fitness" },
  { desc: "Udemy Course — React Advanced", amount: -20, date: "Mar 28", category: "Learning" },
  { desc: "Monthly Allowance Credit", amount: 150, date: "Mar 1", category: "Credit" },
  { desc: "Ergonomic Keyboard", amount: -30, date: "Feb 24", category: "Equipment" },
  { desc: "Healthy Meal Kit Delivery", amount: -35, date: "Feb 15", category: "Food" },
];

export default function BenefitAllowance() {
  const navigate = useNavigate();
  const totalBudget = 150;
  const remaining = 150;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[900px]">
      <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Marketplace
      </motion.button>

      {/* Hero */}
      <motion.div variants={fadeUp} className="rounded-2xl bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(157,70%,40%)] p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src={iconFlexAllowance} alt="Flex Allowance" className="w-16 h-16 object-contain" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-serif text-primary">Flex Allowance</h1>
                <span className="happl-badge bg-primary/15 text-primary text-xs">Active</span>
              </div>
              <p className="text-primary/70 mt-1">Spend on wellness, fitness, learning & lifestyle</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary/60">Available this month</p>
            <AnimatedCounter value={remaining} prefix="€" className="text-3xl font-semibold text-primary" />
            <p className="text-xs text-primary/50">of €150/month</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-primary/60 mb-1.5">
            <span>Spent this month</span>
            <span>€0 / €150</span>
          </div>
          <div className="h-2.5 rounded-full bg-primary/15 overflow-hidden">
            <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: "0%" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-serif text-foreground mb-4">Spend by Category</h2>
            <div className="grid grid-cols-2 gap-3">
              {spendingCategories.map((cat, i) => (
                <motion.div key={cat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }} whileHover={{ scale: 1.02 }} className="happl-card flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center text-lg`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{cat.label}</p>
                    <p className="text-xs text-muted-foreground">€{cat.spent} last month</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <h2 className="text-xl font-serif text-foreground mb-4">Recent Transactions</h2>
            <div className="happl-card-static divide-y divide-border">
              {transactions.map((tx, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <ShoppingBag size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground">{tx.date} · {tx.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${tx.amount > 0 ? "text-accent" : "text-foreground"}`}>
                    {tx.amount > 0 ? "+" : ""}€{Math.abs(tx.amount)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="col-span-2 space-y-4">
          <div className="happl-card-static">
            <h3 className="font-semibold text-foreground mb-3">How it works</h3>
            <ol className="space-y-3">
              {["Browse eligible categories", "Make a purchase or book a service", "Upload your receipt in the app", "Get reimbursed within 5 business days"].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-xs font-semibold text-accent shrink-0">{i + 1}</span>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="happl-card-static">
            <h3 className="font-semibold text-foreground mb-3">Eligible Spending</h3>
            <div className="flex flex-wrap gap-2">
              {["Gym memberships", "Fitness classes", "Meal kits", "Online courses", "Books", "Office equipment", "Therapy sessions", "Meditation apps"].map((item) => (
                <span key={item} className="happl-badge-muted text-xs">{item}</span>
              ))}
            </div>
          </div>
          <button onClick={() => navigate("/enroll/flex-allowance")} className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-lg text-sm font-semibold hover:brightness-95 transition-all">
            Submit a Receipt
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
