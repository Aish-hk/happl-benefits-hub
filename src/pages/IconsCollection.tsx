import { motion } from "framer-motion";

// Import all 3D icons from the icons folder
import healthInsurance from "@/assets/icons/health-insurance.png";
import lifeInsurance from "@/assets/icons/life-insurance.png";
import flexAllowance from "@/assets/icons/flex-allowance.png";
import cycleToWork from "@/assets/icons/cycle-to-work.png";
import learning from "@/assets/icons/learning.png";
import parentalLeave from "@/assets/icons/parental-leave.png";
import incomeProtection from "@/assets/icons/income-protection.png";
import mealAllowance from "@/assets/icons/meal-allowance.png";
import enrollment from "@/assets/icons/enrollment.png";
import checkCircle from "@/assets/icons/check-circle.png";
import trendingUp from "@/assets/icons/trending-up.png";
import clock from "@/assets/icons/clock.png";
import activeBenefits from "@/assets/icons/active-benefits.png";
import categoryAllowances from "@/assets/icons/category-allowances.png";
import categoryCompany from "@/assets/icons/category-company.png";
import categoryInsurance from "@/assets/icons/category-insurance.png";
import categoryPension from "@/assets/icons/category-pension.png";
import categorySacrifice from "@/assets/icons/category-sacrifice.png";
import charity from "@/assets/icons/charity.png";
import dayOff from "@/assets/icons/day-off.png";
import giftVoucher from "@/assets/icons/gift-voucher.png";
import needsAttention from "@/assets/icons/needs-attention.png";
import rewardsChampion from "@/assets/icons/rewards-champion.png";
import rewardsEarlyAdopter from "@/assets/icons/rewards-early-adopter.png";
import rewardsFullCoverage from "@/assets/icons/rewards-full-coverage.png";
import rewardsTeamPlayer from "@/assets/icons/rewards-team-player.png";
import teamLunch from "@/assets/icons/team-lunch.png";
import totalValue from "@/assets/icons/total-value.png";

const icons = [
  { src: healthInsurance, name: "Health Insurance" },
  { src: lifeInsurance, name: "Life Insurance" },
  { src: incomeProtection, name: "Income Protection" },
  { src: flexAllowance, name: "Flex Allowance" },
  { src: mealAllowance, name: "Meal Allowance" },
  { src: cycleToWork, name: "Cycle to Work" },
  { src: learning, name: "Learning & Development" },
  { src: parentalLeave, name: "Parental Leave" },
  { src: dayOff, name: "Day Off" },
  { src: charity, name: "Charity" },
  { src: giftVoucher, name: "Gift Voucher" },
  { src: teamLunch, name: "Team Lunch" },
  { src: categoryInsurance, name: "Category: Insurance" },
  { src: categoryAllowances, name: "Category: Allowances" },
  { src: categoryCompany, name: "Category: Company" },
  { src: categoryPension, name: "Category: Pension & Gov" },
  { src: categorySacrifice, name: "Category: Salary Sacrifice" },
  { src: enrollment, name: "Enrollment" },
  { src: checkCircle, name: "Check / Approved" },
  { src: clock, name: "Pending / Timer" },
  { src: needsAttention, name: "Needs Attention" },
  { src: activeBenefits, name: "Active Benefits" },
  { src: totalValue, name: "Total Value" },
  { src: trendingUp, name: "Trending Up" },
  { src: rewardsChampion, name: "Rewards: Champion" },
  { src: rewardsEarlyAdopter, name: "Rewards: Early Adopter" },
  { src: rewardsFullCoverage, name: "Rewards: Full Coverage" },
  { src: rewardsTeamPlayer, name: "Rewards: Team Player" },
];

export default function IconsCollection() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Happl 3D Icons Collection
        </h1>
        <p className="text-muted-foreground mb-10">
          All 3D glossy icons used across the Happl benefits platform.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {icons.map((icon, i) => (
            <motion.div
              key={icon.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-default"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {icon.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
