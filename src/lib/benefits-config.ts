// Compliance tier definitions
export type TierType = "benefits" | "govt" | "standard" | "premium" | "sacrifice";

export const tierConfig: Record<TierType, { label: string; color: string; dot: string }> = {
  benefits: { label: "Benefits", color: "bg-tier-benefits-bg text-tier-benefits", dot: "bg-tier-benefits" },
  govt: { label: "Gov't Scheme", color: "bg-tier-govt-bg text-tier-govt", dot: "bg-tier-govt" },
  standard: { label: "Industry Standard", color: "bg-tier-standard-bg text-tier-standard", dot: "bg-tier-standard" },
  premium: { label: "Premium", color: "bg-tier-premium-bg text-tier-premium", dot: "bg-tier-premium" },
  sacrifice: { label: "Salary Sacrifice", color: "bg-tier-sacrifice-bg text-tier-sacrifice", dot: "bg-tier-sacrifice" },
};

export const tierLegend = [
  { key: "benefits" as TierType, desc: "employer must provide" },
  { key: "govt" as TierType, desc: "tax incentive, voluntary" },
  { key: "standard" as TierType, desc: "expected, not required" },
  { key: "premium" as TierType, desc: "competitive differentiator" },
  { key: "sacrifice" as TierType, desc: "pre-tax deduction" },
];

// Category definitions
export const benefitCategories = [
  { label: "All benefits", value: "all", emoji: "" },
  { label: "Insurance", value: "insurance", emoji: "🛡️" },
  { label: "Allowances", value: "allowance", emoji: "💳" },
  { label: "Company", value: "company", emoji: "🏢" },
  { label: "Pension & Gov", value: "pension-gov", emoji: "🏦" },
  { label: "Salary Sacrifice", value: "salary-sacrifice", emoji: "⚡" },
];

export const statusFilters = [
  { label: "Available", value: "available" },
  { label: "Enrolled", value: "enrolled" },
];
