import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Clock,
  Check,
} from "lucide-react";

// 3D icons
import iconHealthInsurance from "@/assets/icons/health-insurance.png";
import iconLifeInsurance from "@/assets/icons/life-insurance.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconCycleToWork from "@/assets/icons/cycle-to-work.png";
import iconLearning from "@/assets/icons/learning.png";
import iconParentalLeave from "@/assets/icons/parental-leave.png";
import iconIncomeProtection from "@/assets/icons/income-protection.png";
import iconMealAllowance from "@/assets/icons/meal-allowance.png";

const categories = [
  { label: "All", value: "all" },
  { label: "Insurance", value: "insurance" },
  { label: "Allowances", value: "allowance" },
  { label: "Wellness", value: "wellness" },
  { label: "Lifestyle", value: "lifestyle" },
];

const benefits = [
  {
    id: "health-insurance",
    title: "Health Insurance",
    desc: "Comprehensive medical, dental, and vision coverage for you and your family.",
    icon: iconHealthInsurance,
    category: "insurance",
    status: "enrolled",
    contribution: "€0/mo (company paid)",
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    desc: "4x annual salary coverage with additional critical illness benefit.",
    icon: iconLifeInsurance,
    category: "insurance",
    status: "enrolled",
    contribution: "€0/mo (company paid)",
  },
  {
    id: "flex-allowance",
    title: "Flex Allowance",
    desc: "€150/month to spend on wellness, fitness, or lifestyle purchases.",
    icon: iconFlexAllowance,
    category: "allowance",
    status: "active",
    contribution: "€150/mo",
  },
  {
    id: "cycle-to-work",
    title: "Cycle to Work",
    desc: "Save up to 42% on a new bike and accessories through salary sacrifice.",
    icon: iconCycleToWork,
    category: "lifestyle",
    status: "available",
    contribution: "Salary sacrifice",
  },
  {
    id: "learning-budget",
    title: "Learning & Development",
    desc: "€1,000/year for courses, conferences, and professional development.",
    icon: iconLearning,
    category: "allowance",
    status: "available",
    contribution: "€1,000/yr",
  },
  {
    id: "parental-leave",
    title: "Enhanced Parental Leave",
    desc: "26 weeks fully paid leave for all new parents, regardless of gender.",
    icon: iconParentalLeave,
    category: "insurance",
    status: "available",
    contribution: "Company benefit",
  },
  {
    id: "income-protection",
    title: "Income Protection",
    desc: "75% salary replacement if unable to work due to illness or injury.",
    icon: iconIncomeProtection,
    category: "insurance",
    status: "enrollment",
    contribution: "€12/mo",
  },
  {
    id: "meal-allowance",
    title: "Meal Allowance",
    desc: "€10/day lunch allowance loaded to your Happl card.",
    icon: iconMealAllowance,
    category: "allowance",
    status: "active",
    contribution: "€200/mo",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  enrolled: { label: "Enrolled", color: "bg-accent/15 text-accent" },
  active: { label: "Active", color: "bg-accent/15 text-accent" },
  available: { label: "Available", color: "bg-happl-info/15 text-happl-info" },
  enrollment: { label: "Open Enrollment", color: "bg-happl-warning/15 text-happl-warning" },
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = benefits.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-[1100px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-serif text-foreground">Benefits Marketplace</h1>
        <p className="text-muted-foreground mt-1">
          Explore, compare, and activate your employee benefits
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-[320px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button className="p-2.5 rounded-lg border border-border bg-card hover:bg-secondary transition-colors">
          <SlidersHorizontal size={16} className="text-muted-foreground" />
        </button>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => {
            const sc = statusConfig[b.status];
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
                onClick={() =>
                  navigate(
                    b.category === "allowance"
                      ? "/benefit/allowance"
                      : "/benefit/insurance"
                  )
                }
              >
                <div className="flex items-start gap-4">
                  <img
                    src={b.icon}
                    alt={b.title}
                    className="w-12 h-12 object-contain shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{b.title}</h3>
                      <span className={`happl-badge text-[10px] ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {b.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/80">
                        {b.contribution}
                      </span>
                      <motion.span
                        className="text-xs font-medium text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View details <ChevronRight size={12} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
