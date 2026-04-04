import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Check, Clock } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconIncomeProtection from "@/assets/icons/income-protection.png";
import iconMealAllowance from "@/assets/icons/meal-allowance.png";
import iconLearning from "@/assets/icons/learning.png";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const myBenefits = [
  { title: "Health Insurance", provider: "Bupa · Comprehensive PMI", icon: iconHealthInsurance, status: "Active", cost: "€0/mo", costNote: "Company paid", route: "/benefit/insurance" },
  { title: "Life Insurance", provider: "Aviva · 4x salary", icon: iconLifeInsurance, status: "Active", cost: "€0/mo", costNote: "Company paid", route: "/benefit/insurance" },
  { title: "Income Protection", provider: "Zurich · 75% salary", icon: iconIncomeProtection, status: "Active", cost: "€12/mo", costNote: "Salary deduction", route: "/benefit/insurance" },
  { title: "Wellbeing Allowance", provider: "Happl Spend", icon: iconFlexAllowance, status: "Active", cost: "€600/yr", costNote: "€450 remaining", route: "/benefit/allowance" },
  { title: "Learning & Development", provider: "Happl Spend", icon: iconLearning, status: "Active", cost: "€1,000/yr", costNote: "€800 remaining", route: "/benefit/allowance" },
  { title: "Meal Allowance", provider: "Happl Card", icon: iconMealAllowance, status: "Active", cost: "€200/mo", costNote: "€10/day", route: "/benefit/allowance" },
];

export default function Spend() {
  const navigate = useNavigate();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1000px]">
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl text-foreground">My Benefits</h1>
        <p className="text-muted-foreground mt-1 font-light">Your active benefits and spending overview</p>
      </motion.div>

      {/* Summary cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">TOTAL BENEFITS VALUE</p>
          <AnimatedCounter value={250750} prefix="€" className="text-3xl font-semibold text-foreground" />
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-[10px] text-muted-foreground font-light">Company</p>
              <p className="text-sm font-medium text-foreground">€238,200</p>
            </div>
            <div className="w-px h-6 bg-border" />
            <div>
              <p className="text-[10px] text-muted-foreground font-light">Personal</p>
              <p className="text-sm font-medium text-foreground">€12,550</p>
            </div>
          </div>
        </div>
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">MONTHLY COST</p>
          <AnimatedCounter value={250} prefix="€" className="text-3xl font-semibold text-foreground" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground font-light">
            <span>You: €12/mo</span>
            <span>Company: €238/mo</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
            <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </div>
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">ACTIVE BENEFITS</p>
          <AnimatedCounter value={6} className="text-3xl font-semibold text-foreground" />
          <p className="text-sm text-muted-foreground mt-1 font-light">All benefits healthy</p>
        </div>
      </motion.div>

      {/* Benefits list */}
      <motion.div variants={fadeUp} className="mb-10">
        <h2 className="text-xl text-foreground mb-4">Your enrolled benefits</h2>
        <div className="happl-card-static p-0 overflow-hidden divide-y divide-border">
          {myBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              whileHover={{ backgroundColor: "hsl(40 20% 96%)" }}
              className="flex items-center justify-between px-6 py-4 cursor-pointer transition-colors"
              onClick={() => navigate(b.route)}
            >
              <div className="flex items-center gap-4">
                <img src={b.icon} alt={b.title} className="w-16 h-16 object-contain" />
                <div>
                  <h3 className="font-medium text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground font-light">{b.provider}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{b.cost}</p>
                  <p className="text-xs text-muted-foreground font-light">{b.costNote}</p>
                </div>
                <span className="happl-badge bg-accent/15 text-accent text-xs flex items-center gap-1">
                  <Check size={10} /> {b.status}
                </span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly contributions */}
      <motion.div variants={fadeUp}>
        <h2 className="text-xl text-foreground mb-4">Monthly contributions</h2>
        <div className="happl-card-static">
          <div className="grid grid-cols-4 gap-4 text-xs font-medium tracking-wider text-muted-foreground border-b border-border pb-3 mb-3">
            <span>BENEFIT</span>
            <span>COVERAGE</span>
            <span>CURRENT</span>
            <span>MAX</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <span className="text-foreground font-medium">Coverage</span>
              <span className="text-muted-foreground font-light">€75</span>
              <span className="font-medium text-foreground">€1,000</span>
              <span className="text-muted-foreground font-light">€2,000</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <span className="text-foreground font-medium">SaaS Fee</span>
              <span className="text-muted-foreground font-light">—</span>
              <span className="font-medium text-foreground">€1,000</span>
              <span className="text-muted-foreground font-light">€2,000</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
