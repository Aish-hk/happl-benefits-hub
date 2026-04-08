import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Check } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import TierBadge from "@/components/TierBadge";
import { benefitCategories, type TierType } from "@/lib/benefits-config";

import iconTotalValue from "@/assets/icons/total-value.png";
import iconActiveBenefits from "@/assets/icons/active-benefits.png";
import iconNeedsAttention from "@/assets/icons/needs-attention.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconCycleToWork from "@/assets/icons/cycle-to-work.png";
import iconLearning from "@/assets/icons/learning.png";

import iconCatInsurance from "@/assets/icons/category-insurance.png";
import iconCatAllowances from "@/assets/icons/category-allowances.png";
import iconCatCompany from "@/assets/icons/category-company.png";
import iconCatPension from "@/assets/icons/category-pension.png";
import iconCatSacrifice from "@/assets/icons/category-sacrifice.png";

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
  { label: "TOTAL BENEFITS VALUE", value: 250750, icon: iconTotalValue, prefix: "€", sub: "", style: "bg-primary text-white", breakdown: { company: 238200, personal: 12550 } },
  { label: "ACTIVE BENEFITS", value: 7, icon: iconActiveBenefits, sub: "of 12 total", style: "bg-card border border-primary/40 text-foreground" },
  { label: "NEEDS ATTENTION", value: 3, icon: iconNeedsAttention, sub: "closing soon", style: "bg-card border border-happl-warning/40 text-foreground" },
  { label: "FLEX ALLOWANCES", value: 1250, icon: iconFlexAllowance, prefix: "€", sub: "remaining to spend", style: "bg-card border border-accent/40 text-foreground" },
];

const enrollmentItems = [
  { id: "health-insurance", title: "Private Medical Insurance", provider: "Bupa · Comprehensive PMI", icon: iconHealthInsurance, daysLeft: 14, tier: "standard" as TierType },
  { id: "dental-plan", title: "Dental Plan", provider: "Denplan · Routine + emergency", icon: iconLifeInsurance, daysLeft: 14, tier: "standard" as TierType },
  { id: "cycle-to-work", title: "Cycle to Work", provider: "Cyclescheme · Salary sacrifice", icon: iconCycleToWork, daysLeft: 30, tier: "govt" as TierType },
];

const allowances = [
  { id: "wellbeing-allowance", title: "Wellbeing Allowance", provider: "Happl Spend", icon: iconFlexAllowance, spent: 150, total: 600, remaining: 450, resets: "Resets Jan 2027", tier: "premium" as TierType },
  { id: "learning-budget", title: "Learning & Development", provider: "Happl Spend", icon: iconLearning, spent: 200, total: 1000, remaining: 800, resets: "Resets Jan 2027", tier: "premium" as TierType },
];

const activeBenefits = [
  { id: "health-insurance", title: "Health Insurance", subtitle: "Bupa · Comprehensive PMI", icon: iconHealthInsurance, status: "Active", tier: "standard" as TierType },
  { id: "life-insurance", title: "Life Insurance", subtitle: "Aviva · 4x salary cover", icon: iconLifeInsurance, status: "Active", tier: "standard" as TierType },
  { id: "annual-leave", title: "Annual Leave", subtitle: "25 days + bank holidays", icon: iconFlexAllowance, status: "Active", tier: "benefits" as TierType },
  { id: "workplace-pension", title: "Workplace Pension", subtitle: "Scottish Widows · 5% employer match", icon: iconTotalValue, status: "Active", tier: "govt" as TierType },
];

const availableBenefits = [
  { id: "mental-health", title: "Mental Health Support", subtitle: "Spill · 8 free therapy sessions", image: mentalHealthImg, tag: "Quick activate", tagColor: "bg-accent text-white", tier: "premium" as TierType },
  { id: "ev-scheme", title: "Electric Vehicle Scheme", subtitle: "Octopus EV · Save up to 40%", image: evSchemeImg, tag: "Enrollment open", tagColor: "bg-happl-warning text-white", tier: "sacrifice" as TierType },
  { id: "travel-insurance", title: "Travel Insurance", subtitle: "AXA · Worldwide cover", image: travelInsuranceImg, tag: "Quick activate", tagColor: "bg-accent text-white", tier: "premium" as TierType },
];

const browseCategoryCards = [
  { label: "Insurance", count: "5 benefits", subtitle: "PMI, Dental, Life", icon: iconCatInsurance, stripeColor: "bg-destructive/20", value: "insurance" },
  { label: "Allowances", count: "2 benefits", subtitle: "Wellbeing, L&D", icon: iconCatAllowances, stripeColor: "bg-tier-premium-bg", value: "allowance" },
  { label: "Company", count: "1 benefit", subtitle: "Annual Leave", icon: iconCatCompany, stripeColor: "bg-tier-benefits-bg", value: "company" },
  { label: "Pension & Gov", count: "2 benefits", subtitle: "Pension, Cycle", icon: iconCatPension, stripeColor: "bg-tier-govt-bg", value: "pension-gov" },
  { label: "Salary Sacrifice", count: "2 benefits", subtitle: "EV, Cycle", icon: iconCatSacrifice, stripeColor: "bg-tier-sacrifice-bg", value: "salary-sacrifice" },
];

export default function BenefitsHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Filter content based on active tab
  const filteredEnrollment = enrollmentItems.filter(
    (item) => activeTab === "all" || getCategoryForTier(item.tier) === activeTab
  );
  const filteredAllowances = allowances.filter(
    (item) => activeTab === "all" || getCategoryForTier(item.tier) === activeTab
  );
  const filteredActive = activeBenefits.filter(
    (item) => activeTab === "all" || getCategoryForTier(item.tier) === activeTab
  );
  const filteredAvailable = availableBenefits.filter(
    (item) => activeTab === "all" || getCategoryForTier(item.tier) === activeTab
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
      {/* Greeting */}
      <motion.div variants={fadeUp} className="mb-6">
        <h1 className="text-3xl text-foreground">Good morning, Sarah</h1>
        <p className="text-muted-foreground mt-1 font-light">Here's your benefits overview</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, idx) => {
          const isDark = idx === 0;
          const isFlex = idx === 3;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative rounded-2xl p-6 pt-16 overflow-visible shadow-lg ${stat.style}`}
            >
              <motion.img
                src={stat.icon}
                alt={stat.label}
                className="absolute -top-10 right-2 w-28 h-28 object-contain drop-shadow-xl pointer-events-none"
                initial={{ y: 20, opacity: 0, rotate: -5 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                loading="lazy"
              />
              <p className={`text-xs font-medium tracking-wider mb-2 ${isDark ? "text-white/80" : "text-muted-foreground"}`}>{stat.label}</p>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                className={`text-3xl font-semibold ${isDark ? "text-white" : "text-foreground"}`}
              />
              {stat.breakdown ? (
                <div className="flex items-center gap-3 mt-2">
                  <div>
                    <p className="text-[10px] text-white/50 font-light">Company</p>
                    <p className="text-xs font-medium text-white">€{stat.breakdown.company.toLocaleString()}</p>
                  </div>
                  <div className="w-px h-5 bg-white/20" />
                  <div>
                    <p className="text-[10px] text-white/50 font-light">Personal</p>
                    <p className="text-xs font-medium text-white">€{stat.breakdown.personal.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <p className={`text-sm mt-1 font-light ${isDark ? "text-white/70" : isFlex ? "text-accent" : "text-muted-foreground"}`}>{stat.sub}</p>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Category Tabs - below cards */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center gap-2 flex-wrap bg-card border border-border rounded-2xl p-2">
          {benefitCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                activeTab === cat.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground font-light"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>
      {filteredEnrollment.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-foreground">Enrollment window open</h2>
            <button onClick={() => navigate("/marketplace")} className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="happl-card-static border-happl-warning/30 bg-happl-warning/5 p-0 overflow-hidden">
            <div className="px-6 py-3 flex items-center gap-2 border-b border-happl-warning/20">
              <Clock size={14} className="text-happl-warning" />
              <p className="text-sm font-medium text-happl-warning">These benefits close for enrollment on 18 April 2026</p>
            </div>
            <div className="divide-y divide-border">
              {filteredEnrollment.map((item, i) => (
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
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <TierBadge tier={item.tier} />
                      </div>
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
      )}

      {/* Browse by Category */}
      {activeTab === "all" && (
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="text-xl text-foreground mb-4">Browse by category</h2>
          <div className="grid grid-cols-5 gap-4">
            {browseCategoryCards.map((cat, i) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="happl-card cursor-pointer !p-0 overflow-hidden"
                onClick={() => navigate(`/marketplace?category=${cat.value}`)}
              >
                <div className={`h-1 ${cat.stripeColor}`} />
                <div className="p-4">
                  <img src={cat.icon} alt={cat.label} className="w-12 h-12 object-contain" loading="lazy" />
                  <h3 className="font-medium text-foreground mt-2 text-sm">{cat.label}</h3>
                  <p className="text-xs text-accent font-medium">{cat.count}</p>
                  <p className="text-xs text-muted-foreground font-light mt-1">{cat.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Benefits */}
      {filteredActive.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-foreground">Active benefits</h2>
            <button onClick={() => navigate("/spend")} className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredActive.map((b, i) => (
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
                  <TierBadge tier={b.tier} className="mt-2" />
                </div>
                <span className="happl-badge bg-accent/15 text-accent text-xs flex items-center gap-1">
                  <Check size={10} /> {b.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Your Allowances */}
      {filteredAllowances.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="text-xl text-foreground mb-4">Your allowances</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredAllowances.map((a) => (
              <motion.div
                key={a.title}
                whileHover={{ scale: 1.01, y: -2 }}
                className="happl-card cursor-pointer relative"
                onClick={() => navigate("/benefit/allowance")}
              >
                <div className="absolute top-4 right-4">
                  <TierBadge tier={a.tier} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={a.icon} alt={a.title} className="w-18 h-18 object-contain" loading="lazy" />
                  <div>
                    <h3 className="font-medium text-foreground">{a.title}</h3>
                    <p className="text-sm text-accent font-light">{a.provider}</p>
                  </div>
                </div>
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
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground font-light">€{a.spent} spent</span>
                  <span className="text-xs text-muted-foreground font-light">·</span>
                  <span className="text-xs text-muted-foreground font-light">{a.resets}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available to You */}
      {filteredAvailable.length > 0 && (
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-foreground">Available to you</h2>
            <button onClick={() => navigate("/marketplace")} className="text-sm font-medium text-foreground flex items-center gap-1 hover:underline">
              Browse all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredAvailable.map((b, i) => (
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
                  <p className="text-sm text-muted-foreground mb-2 font-light">{b.subtitle}</p>
                  <TierBadge tier={b.tier} className="mb-3" />
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
      )}
    </motion.div>
  );
}

function getCategoryForTier(tier: TierType): string {
  switch (tier) {
    case "standard": return "insurance";
    case "premium": return "allowance";
    case "benefits": return "company";
    case "govt": return "pension-gov";
    case "sacrifice": return "salary-sacrifice";
    default: return "all";
  }
}
