import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Check } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import happlIcon from "@/assets/happl-icon.png";

import iconTotalValue from "@/assets/icons/total-value.png";
import iconActiveBenefits from "@/assets/icons/active-benefits.png";
import iconNeedsAttention from "@/assets/icons/needs-attention.png";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconCycleToWork from "@/assets/icons/cycle-to-work.png";
import iconLearning from "@/assets/icons/learning.png";

import mentalHealthImg from "@/assets/mental-health-card.jpg";
import evSchemeImg from "@/assets/ev-scheme-card.jpg";
import travelInsuranceImg from "@/assets/travel-insurance-card.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const quickStats = [
  { label: "TOTAL PACKAGE VALUE", value: 15200, icon: iconTotalValue, prefix: "€", sub: "per year", style: "bg-primary text-white" },
  { label: "ACTIVE BENEFITS", value: 7, icon: iconActiveBenefits, sub: "of 12 total", style: "bg-card border border-primary/40 text-foreground" },
  { label: "NEEDS ATTENTION", value: 3, icon: iconNeedsAttention, sub: "closing soon", style: "bg-card border border-happl-warning/40 text-foreground" },
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
    spent: 150,
    total: 600,
    remaining: 450,
    yourCost: "€0",
    monthly: "€41.41",
    totalSaved: "€1,490.40",
    resets: "Resets Jan 2027",
  },
  {
    title: "Learning & Development",
    provider: "Happl Spend",
    icon: iconLearning,
    spent: 200,
    total: 1000,
    remaining: 800,
    yourCost: "€0",
    monthly: "€83.33",
    totalSaved: "€800.00",
    resets: "Resets Jan 2027",
  },
];

const activeBenefits = [
  {
    title: "Health Insurance",
    subtitle: "Bupa · Comprehensive PMI",
    icon: iconHealthInsurance,
    status: "Active",
  },
  {
    title: "Life Insurance",
    subtitle: "Aviva · 4x salary cover",
    icon: iconLifeInsurance,
    status: "Active",
  },
];

const availableBenefits = [
  {
    title: "Mental Health Support",
    subtitle: "Spill · 8 free therapy sessions",
    image: mentalHealthImg,
    tag: "Quick activate",
    tagColor: "bg-accent/15 text-accent",
  },
  {
    title: "Electric Vehicle Scheme",
    subtitle: "Octopus EV · Save up to 40%",
    image: evSchemeImg,
    tag: "Enrollment open",
    tagColor: "bg-happl-warning/15 text-happl-warning",
  },
  {
    title: "Travel Insurance",
    subtitle: "AXA · Worldwide cover",
    image: travelInsuranceImg,
    tag: "Quick activate",
    tagColor: "bg-accent/15 text-accent",
  },
];

export default function BenefitsHome() {
  const navigate = useNavigate();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1000px]">
      {/* Greeting */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl text-foreground">Good morning, Sarah</h1>
        <p className="text-muted-foreground mt-1 font-light">Here's your benefits overview</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
        {quickStats.map((stat, idx) => {
          const isDark = idx === 0;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative rounded-2xl p-6 pt-16 overflow-visible shadow-lg ${stat.style}`}
            >
              <motion.img
                src={stat.icon}
                alt={stat.label}
                className="absolute -top-10 right-2 w-36 h-36 object-contain drop-shadow-xl pointer-events-none"
                initial={{ y: 20, opacity: 0, rotate: -5 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                loading="lazy"
              />
              <p className={`text-xs font-medium tracking-wider mb-2 ${isDark ? "text-white/80" : "text-muted-foreground"}`}>{stat.label}</p>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                className={`text-4xl font-semibold ${isDark ? "text-white" : "text-foreground"}`}
              />
              <p className={`text-sm mt-1 font-light ${isDark ? "text-white/70" : "text-muted-foreground"}`}>{stat.sub}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enrollment Window */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-foreground">Enrollment window open</h2>
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
                  <img src={item.icon} alt={item.title} className="w-18 h-18 object-contain" loading="lazy" />
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="happl-badge bg-muted text-muted-foreground text-xs flex items-center gap-1">
                    <Clock size={12} /> {item.daysLeft}d left
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/enroll/${item.title.toLowerCase().replace(/ /g, '-')}`); }}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:brightness-110 transition-all"
                  >
                    Enrol
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Benefits */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-foreground">Active benefits</h2>
          <button
            onClick={() => navigate("/spend")}
            className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {activeBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="happl-card cursor-pointer flex items-center gap-4"
              onClick={() => navigate("/benefit/insurance")}
            >
              <img src={b.icon} alt={b.title} className="w-20 h-20 object-contain" loading="lazy" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{b.subtitle}</p>
              </div>
              <span className="happl-badge bg-accent/15 text-accent text-xs flex items-center gap-1">
                <Check size={10} /> {b.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Allowances */}
      <motion.div variants={fadeUp} className="mb-10">
        <h2 className="text-xl text-foreground mb-4">Your allowances</h2>
        <div className="grid grid-cols-2 gap-4">
          {allowances.map((a) => (
            <motion.div
              key={a.title}
              whileHover={{ scale: 1.01, y: -2 }}
              className="happl-card cursor-pointer"
              onClick={() => navigate("/benefit/allowance")}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={a.icon} alt={a.title} className="w-18 h-18 object-contain" loading="lazy" />
                <div>
                  <h3 className="font-medium text-foreground">{a.title}</h3>
                  <p className="text-sm text-accent font-light">{a.provider}</p>
                </div>
              </div>

              {/* Remaining highlight */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter value={a.remaining} prefix="€" className="text-3xl font-semibold text-foreground" />
                  <span className="text-sm text-muted-foreground font-light">remaining</span>
                </div>
                <span className="text-sm text-muted-foreground font-light">of €{a.total.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(a.spent / a.total) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>

              {/* NI Savings Calculator */}
              <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <img src={happlIcon} alt="Happl" className="w-6 h-6 rounded-md object-cover" />
                  <span className="text-sm font-medium text-foreground">NI Savings Calculator</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] font-medium text-accent tracking-wide">Your Cost</p>
                    <p className="text-base font-semibold text-foreground">{a.yourCost}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-accent tracking-wide">Monthly</p>
                    <p className="text-base font-semibold text-foreground">{a.monthly}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-accent tracking-wide">Total</p>
                    <p className="text-base font-semibold text-foreground">{a.totalSaved}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-light mt-3">{a.resets}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available to You — Image cards like Happl reference */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-foreground">Available to you</h2>
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
              className="rounded-2xl overflow-hidden border border-border bg-card cursor-pointer shadow-sm"
              onClick={() => navigate("/benefit/insurance")}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 left-3">
                  <span className={`happl-badge text-[10px] ${b.tagColor}`}>{b.tag}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">{b.subtitle}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/enroll/${b.title.toLowerCase().replace(/ /g, '-')}`); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:brightness-110 transition-all"
                >
                  {b.tag === "Quick activate" ? "Activate Now" : "Enrol"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
