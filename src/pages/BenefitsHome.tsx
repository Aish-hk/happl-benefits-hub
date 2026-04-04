import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

import iconTotalValue from "@/assets/icons/total-value.png";
import iconActiveBenefits from "@/assets/icons/active-benefits.png";
import iconNeedsAttention from "@/assets/icons/needs-attention.png";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconCycleToWork from "@/assets/icons/cycle-to-work.png";
import iconLearning from "@/assets/icons/learning.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const quickStats = [
  { label: "TOTAL PACKAGE VALUE", value: 15200, icon: iconTotalValue, prefix: "€", sub: "per year", bg: "bg-primary" },
  { label: "ACTIVE BENEFITS", value: 7, icon: iconActiveBenefits, sub: "of 12 total", bg: "bg-accent" },
  { label: "NEEDS ATTENTION", value: 3, icon: iconNeedsAttention, sub: "closing soon", bg: "bg-happl-warning", highlight: true },
];

const enrollmentItems = [
  {
    title: "Private Medical Insurance",
    provider: "Bupa · Comprehensive PMI",
    icon: iconHealthInsurance,
    daysLeft: 14,
  },
  {
    title: "Dental Plan",
    provider: "Denplan · Routine + emergency",
    icon: iconLifeInsurance,
    daysLeft: 14,
  },
  {
    title: "Cycle to Work",
    provider: "Cyclescheme · Salary sacrifice",
    icon: iconCycleToWork,
    daysLeft: 30,
  },
];

const allowances = [
  {
    title: "Wellbeing Allowance",
    provider: "Happl Spend",
    icon: iconFlexAllowance,
    spent: 450,
    total: 600,
    resets: "Resets Jan 2027",
  },
  {
    title: "Learning & Development",
    provider: "Happl Spend",
    icon: iconLearning,
    spent: 800,
    total: 1000,
    resets: "Resets Jan 2027",
  },
];

const availableBenefits = [
  {
    title: "Mental Health Support",
    subtitle: "Spill · 8 free therapy sessions",
    icon: iconHealthInsurance,
    action: "Quick activate",
  },
  {
    title: "Electric Vehicle Scheme",
    subtitle: "Octopus EV · Save up to 40%",
    icon: iconCycleToWork,
    action: "Available",
  },
  {
    title: "Travel Insurance",
    subtitle: "AXA · Worldwide cover",
    icon: iconLifeInsurance,
    action: "Quick activate",
  },
];

export default function BenefitsHome() {
  const navigate = useNavigate();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1000px]">
      {/* Greeting */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Good morning, Sarah</h1>
        <p className="text-muted-foreground mt-1">Here's your benefits overview</p>
      </motion.div>

      {/* Quick Stats — big cards with oversized 3D icons */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative rounded-2xl p-6 pt-14 overflow-visible ${stat.bg} text-white shadow-lg`}
          >
            {/* Oversized 3D icon breaking out of card */}
            <motion.img
              src={stat.icon}
              alt={stat.label}
              className="absolute -top-8 right-3 w-28 h-28 object-contain drop-shadow-xl pointer-events-none"
              initial={{ y: 20, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              loading="lazy"
            />
            <p className="text-xs font-semibold tracking-wider text-white/80 mb-2">{stat.label}</p>
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              className="text-4xl font-bold text-white"
            />
            <p className="text-sm text-white/70 mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Enrollment Window */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Enrollment window open</h2>
          <button
            onClick={() => navigate("/marketplace")}
            className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="happl-card-static border-happl-warning/30 bg-happl-warning/5 p-0 overflow-hidden">
          <div className="px-6 py-3 flex items-center gap-2 border-b border-happl-warning/20">
            <Clock size={14} className="text-happl-warning" />
            <p className="text-sm font-medium text-happl-warning">
              These benefits close for enrollment on 18 April 2026
            </p>
          </div>
          <div className="divide-y divide-border">
            {enrollmentItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 4, backgroundColor: "hsl(40 20% 96%)" }}
                className="flex items-center justify-between px-6 py-4 cursor-pointer transition-colors"
                onClick={() => navigate("/benefit/insurance")}
              >
                <div className="flex items-center gap-4">
                  <img src={item.icon} alt={item.title} className="w-14 h-14 object-contain" loading="lazy" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="happl-badge bg-muted text-muted-foreground text-xs flex items-center gap-1">
                    <Clock size={12} /> {item.daysLeft}d left
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Your Allowances */}
      <motion.div variants={fadeUp} className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-4">Your allowances</h2>
        <div className="grid grid-cols-2 gap-4">
          {allowances.map((a) => (
            <motion.div
              key={a.title}
              whileHover={{ scale: 1.01, y: -2 }}
              className="happl-card cursor-pointer"
              onClick={() => navigate("/benefit/allowance")}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={a.icon} alt={a.title} className="w-14 h-14 object-contain" loading="lazy" />
                <div>
                  <h3 className="font-semibold text-foreground">{a.title}</h3>
                  <p className="text-sm text-accent">{a.provider}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <AnimatedCounter value={a.spent} prefix="€" className="text-3xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground">of €{a.total.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(a.spent / a.total) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{a.resets}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available to You */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Available to you</h2>
          <button
            onClick={() => navigate("/marketplace")}
            className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline"
          >
            Browse all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {availableBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="happl-card cursor-pointer"
              onClick={() => navigate("/benefit/insurance")}
            >
              <img src={b.icon} alt={b.title} className="w-16 h-16 object-contain mb-4" loading="lazy" />
              <h3 className="font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{b.subtitle}</p>
              <span className={`happl-badge text-xs ${b.action === "Available" ? "bg-muted text-muted-foreground" : "bg-accent/15 text-accent"}`}>
                {b.action}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
