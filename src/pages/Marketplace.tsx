import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, LayoutGrid, List } from "lucide-react";
import TierBadge from "@/components/TierBadge";
import { tierConfig, tierLegend, benefitCategories, statusFilters, type TierType } from "@/lib/benefits-config";

import marketplaceHero from "@/assets/marketplace-hero.jpg";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconCycleToWork from "@/assets/icons/cycle-to-work.png";
import iconLearning from "@/assets/icons/learning.png";
import iconParentalLeave from "@/assets/icons/parental-leave.png";
import iconIncomeProtection from "@/assets/icons/income-protection.png";
import iconMealAllowance from "@/assets/icons/meal-allowance.png";

interface Benefit {
  id: string;
  title: string;
  provider: string;
  desc: string;
  icon: string;
  category: string;
  status: string;
  contribution: string;
  tier: TierType;
}

const benefits: Benefit[] = [
  { id: "health-insurance", title: "Private Medical Insurance", provider: "Bupa", desc: "Comprehensive medical, dental, and vision coverage for you and your family.", icon: iconHealthInsurance, category: "insurance", status: "enrolled", contribution: "€0/mo (company paid)", tier: "standard" },
  { id: "life-insurance", title: "Life Assurance", provider: "Aviva", desc: "4x annual salary coverage with additional critical illness benefit.", icon: iconLifeInsurance, category: "insurance", status: "enrolled", contribution: "€0/mo (company paid)", tier: "standard" },
  { id: "dental-plan", title: "Dental Plan", provider: "Denplan", desc: "Routine and emergency dental coverage for you and your family.", icon: iconHealthInsurance, category: "insurance", status: "enrollment", contribution: "€18/mo", tier: "standard" },
  { id: "income-protection", title: "Income Protection", provider: "Unum", desc: "75% salary replacement if unable to work due to illness or injury.", icon: iconIncomeProtection, category: "insurance", status: "enrollment", contribution: "€12/mo", tier: "standard" },
  { id: "travel-insurance", title: "Travel Insurance", provider: "AXA", desc: "Worldwide travel cover for you and your family, business and leisure.", icon: iconLifeInsurance, category: "insurance", status: "available", contribution: "€8/mo", tier: "premium" },
  { id: "wellbeing-allowance", title: "Wellbeing Allowance", provider: "Happl Spend", desc: "€150/month to spend on wellness, fitness, or lifestyle purchases.", icon: iconFlexAllowance, category: "allowance", status: "active", contribution: "€150/mo", tier: "premium" },
  { id: "learning-budget", title: "Learning & Development", provider: "Happl Spend", desc: "€1,000/year for courses, conferences, and professional development.", icon: iconLearning, category: "allowance", status: "active", contribution: "€1,000/yr", tier: "premium" },
  { id: "mental-health", title: "Mental Health Support", provider: "Spill", desc: "8 free therapy sessions per year with qualified therapists.", icon: iconParentalLeave, category: "allowance", status: "available", contribution: "Company paid", tier: "premium" },
  { id: "annual-leave", title: "Annual Leave", provider: "Company", desc: "25 days annual leave plus bank holidays with buy/sell option.", icon: iconMealAllowance, category: "company", status: "active", contribution: "Company benefit", tier: "benefits" },
  { id: "workplace-pension", title: "Workplace Pension", provider: "Aviva", desc: "Employer contributes 5%, employee contributes 3% minimum.", icon: iconIncomeProtection, category: "pension-gov", status: "enrolled", contribution: "5% + 3%", tier: "benefits" },
  { id: "cycle-to-work", title: "Cycle to Work", provider: "Cyclescheme", desc: "Save up to 42% on a new bike and accessories through salary sacrifice.", icon: iconCycleToWork, category: "pension-gov", status: "available", contribution: "Salary sacrifice", tier: "govt" },
  { id: "ev-scheme", title: "Electric Vehicle Scheme", provider: "Octopus EV", desc: "Save up to 40% on a new EV via salary sacrifice.", icon: iconCycleToWork, category: "salary-sacrifice", status: "available", contribution: "Salary sacrifice", tier: "sacrifice" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  enrolled: { label: "✓ Enrolled", color: "bg-accent/15 text-accent" },
  active: { label: "✓ Active", color: "bg-accent/15 text-accent" },
  available: { label: "Available", color: "bg-muted text-muted-foreground" },
  enrollment: { label: "⏱ Enrollment open", color: "bg-happl-warning/15 text-happl-warning" },
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const navigate = useNavigate();

  const filtered = benefits.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const matchStatus =
      activeStatus === "all" ||
      (activeStatus === "enrolled" && (b.status === "enrolled" || b.status === "active")) ||
      (activeStatus === "available" && (b.status === "available" || b.status === "enrollment"));
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && matchStatus;
  });

  const getAction = (b: Benefit) => {
    if (b.status === "available" || b.status === "enrollment") return { label: "Enrol →", action: () => navigate(`/enroll/${b.id}`) };
    if (b.status === "active" && b.category === "allowance") return { label: "Spend", action: () => navigate("/benefit/allowance") };
    return { label: "Manage", action: () => navigate(b.category === "allowance" ? "/benefit/allowance" : "/benefit/insurance") };
  };

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl text-foreground">Benefits Marketplace</h1>
        <p className="text-muted-foreground mt-1 font-light">Explore, compare, and activate your employee benefits</p>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative rounded-2xl overflow-hidden mb-8 h-[320px]"
      >
        <img src={marketplaceHero} alt="Benefits Marketplace" className="w-full h-full object-cover" width={1200} height={512} />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-medium shadow-md">
            NEW PARTNERSHIP
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black/60 to-transparent">
          <h2 className="text-white text-lg font-medium">Wellness & Mental Health Partnership</h2>
          <p className="text-white/80 text-sm font-light mt-1">New exclusive benefits from our partners — explore counselling, fitness and more.</p>
        </div>
      </motion.div>

      {/* Legend Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="happl-card-static mb-6 !py-3 !px-5"
      >
        <div className="flex items-center gap-6 flex-wrap">
          {tierLegend.map((t) => {
            const cfg = tierConfig[t.key];
            return (
              <div key={t.key} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                <span className="text-xs text-foreground font-medium">{cfg.label}</span>
                <span className="text-xs text-muted-foreground font-light">— {t.desc}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Search + View Toggle + Filters */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative max-w-[320px] w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-light focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category + Status filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {benefitCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all border ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground border-primary font-medium"
                  : "bg-card text-muted-foreground border-border hover:text-foreground font-light"
              }`}
            >
              {cat.label}
            </button>
          ))}

          <div className="w-px h-6 bg-border mx-2" />

          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              onClick={() => setActiveStatus(sf.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all border ${
                activeStatus === sf.value
                  ? "bg-primary text-primary-foreground border-primary font-medium"
                  : "bg-card text-muted-foreground border-border hover:text-foreground font-light"
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="happl-card-static text-center py-12">
          <p className="text-muted-foreground font-light mb-3">No benefits match your filters</p>
          <button
            onClick={() => { setActiveCategory("all"); setActiveStatus("all"); setSearchQuery(""); }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Card View */}
      {viewMode === "grid" && filtered.length > 0 && (
        <motion.div layout className="grid grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((b, i) => {
              const sc = statusConfig[b.status];
              const isEnrollable = b.status === "available" || b.status === "enrollment";
              return (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  className="happl-card cursor-pointer group"
                  onClick={() => navigate(b.category === "allowance" ? "/benefit/allowance" : "/benefit/insurance")}
                >
                  <div className="flex items-start gap-4">
                    <img src={b.icon} alt={b.title} className="w-16 h-16 object-contain shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-base">{b.title}</h3>
                      <p className="text-[13px] text-muted-foreground font-light">{b.provider}</p>
                      <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2 font-light">{b.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <TierBadge tier={b.tier} />
                        <span className={`happl-badge text-[10px] ${sc.color}`}>{sc.label}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Table View */}
      {viewMode === "table" && filtered.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="happl-card-static !p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Benefit</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Category</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Tier</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => {
                const sc = statusConfig[b.status];
                const act = getAction(b);
                return (
                  <tr
                    key={b.id}
                    className="hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => navigate(b.category === "allowance" ? "/benefit/allowance" : "/benefit/insurance")}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={b.icon} alt={b.title} className="w-10 h-10 object-contain" loading="lazy" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{b.title}</p>
                          <p className="text-xs text-muted-foreground font-light">{b.provider}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground font-light capitalize">{b.category.replace("-", " & ")}</td>
                    <td className="px-5 py-3.5"><TierBadge tier={b.tier} /></td>
                    <td className="px-5 py-3.5"><span className={`happl-badge text-[10px] ${sc.color}`}>{sc.label}</span></td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); act.action(); }}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        {act.label}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
