import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

import iconCheckCircle from "@/assets/icons/check-circle.png";
import iconTrendingUp from "@/assets/icons/trending-up.png";
import iconFlexAllowance from "@/assets/icons/flex-allowance.png";
import iconDayOff from "@/assets/icons/day-off.png";
import iconGiftVoucher from "@/assets/icons/gift-voucher.png";
import iconCharity from "@/assets/icons/charity.png";
import iconTeamLunch from "@/assets/icons/team-lunch.png";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const rewards = [
  { title: "Benefits Champion", desc: "Enrolled in 5+ benefits", icon: iconCheckCircle, earned: true, points: 200 },
  { title: "Early Adopter", desc: "Activated benefits in first week", icon: iconTrendingUp, earned: true, points: 150 },
  { title: "Wellness Warrior", desc: "Used wellbeing allowance 3 months in a row", icon: iconFlexAllowance, earned: true, points: 300 },
  { title: "Team Player", desc: "Referred a colleague to a benefit", icon: iconCheckCircle, earned: false, points: 100 },
  { title: "Full Coverage", desc: "Activate all available benefits", icon: iconTrendingUp, earned: false, points: 500 },
];

const redeemOptions = [
  { title: "Extra Day Off", points: 500, icon: iconDayOff },
  { title: "€50 Gift Voucher", points: 300, icon: iconGiftVoucher },
  { title: "Charity Donation", points: 200, icon: iconCharity },
  { title: "Team Lunch", points: 400, icon: iconTeamLunch },
];

export default function Rewards() {
  const totalPoints = 650;
  const earnedCount = rewards.filter(r => r.earned).length;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1000px]">
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl text-foreground">Rewards</h1>
        <p className="text-muted-foreground mt-1 font-light">Earn points by engaging with your benefits</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-10">
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">TOTAL POINTS</p>
          <AnimatedCounter value={totalPoints} className="text-4xl font-semibold text-accent" />
          <p className="text-sm text-muted-foreground mt-1 font-light">Available to redeem</p>
        </div>
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">BADGES EARNED</p>
          <AnimatedCounter value={earnedCount} className="text-4xl font-semibold text-foreground" />
          <p className="text-sm text-muted-foreground mt-1 font-light">of {rewards.length} total</p>
        </div>
        <div className="happl-card p-6">
          <p className="text-xs font-medium tracking-wider text-muted-foreground mb-2">CURRENT STREAK</p>
          <div className="flex items-baseline gap-1">
            <AnimatedCounter value={12} className="text-4xl font-semibold text-foreground" />
            <span className="text-lg text-muted-foreground font-light">weeks</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 font-light">Benefits engagement</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <motion.div variants={fadeUp}>
            <h2 className="text-xl text-foreground mb-4">Your badges</h2>
            <div className="space-y-3">
              {rewards.map((r, i) => (
                <motion.div key={r.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                  className={`happl-card flex items-center gap-4 ${!r.earned ? "opacity-50" : ""}`}>
                  <img src={r.icon} alt={r.title} className="w-18 h-18 object-contain" loading="lazy" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{r.title}</h3>
                      {r.earned && <span className="happl-badge bg-accent/15 text-accent text-[10px]">Earned</span>}
                    </div>
                    <p className="text-sm text-muted-foreground font-light">{r.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{r.points}</p>
                    <p className="text-xs text-muted-foreground font-light">points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="col-span-2">
          <h2 className="text-xl text-foreground mb-4">Redeem points</h2>
          <div className="space-y-3">
            {redeemOptions.map((opt) => (
              <motion.div key={opt.title} whileHover={{ scale: 1.02 }} className="happl-card cursor-pointer flex items-center gap-4">
                <img src={opt.icon} alt={opt.title} className="w-18 h-18 object-contain" loading="lazy" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground font-light">{opt.points} points</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    totalPoints >= opt.points
                      ? "bg-accent text-accent-foreground hover:brightness-95"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  disabled={totalPoints < opt.points}
                >
                  Redeem
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
