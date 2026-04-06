import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Gift, ArrowRight } from "lucide-react";
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
  { title: "Extra Day Off", points: 500, icon: iconDayOff, desc: "Take an additional paid day off" },
  { title: "€50 Gift Voucher", points: 300, icon: iconGiftVoucher, desc: "Choose from 100+ retailers" },
  { title: "Charity Donation", points: 200, icon: iconCharity, desc: "Donate to a charity of your choice" },
  { title: "Team Lunch", points: 400, icon: iconTeamLunch, desc: "Treat your team to lunch" },
];

type RedeemStep = "idle" | "confirm" | "success";

export default function Rewards() {
  const [totalPoints, setTotalPoints] = useState(650);
  const earnedCount = rewards.filter(r => r.earned).length;
  const [redeemState, setRedeemState] = useState<{ step: RedeemStep; option: typeof redeemOptions[0] | null }>({ step: "idle", option: null });

  const handleRedeem = (opt: typeof redeemOptions[0]) => {
    setRedeemState({ step: "confirm", option: opt });
  };

  const confirmRedeem = () => {
    if (redeemState.option) {
      setTotalPoints(prev => prev - redeemState.option!.points);
      setRedeemState({ step: "success", option: redeemState.option });
    }
  };

  const closeRedeem = () => {
    setRedeemState({ step: "idle", option: null });
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
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
                  onClick={() => handleRedeem(opt)}
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

      {/* Redeem Modal */}
      <AnimatePresence>
        {redeemState.step !== "idle" && redeemState.option && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={closeRedeem}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {redeemState.step === "confirm" && (
                <div className="text-center">
                  <img src={redeemState.option.icon} alt={redeemState.option.title} className="w-24 h-24 mx-auto mb-4 object-contain" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Redeem {redeemState.option.title}?</h3>
                  <p className="text-sm text-muted-foreground font-light mb-2">{redeemState.option.desc}</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-2xl font-semibold text-accent">{redeemState.option.points}</span>
                    <span className="text-sm text-muted-foreground font-light">points will be deducted</span>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-light">Current balance</span>
                      <span className="font-medium text-foreground">{totalPoints} pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground font-light">After redemption</span>
                      <span className="font-medium text-accent">{totalPoints - redeemState.option.points} pts</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={closeRedeem}
                      className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmRedeem}
                      className="flex-1 px-4 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Gift size={16} /> Confirm Redeem
                    </button>
                  </div>
                </div>
              )}

              {redeemState.step === "success" && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check size={40} className="text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Redeemed!</h3>
                  <p className="text-sm text-muted-foreground font-light mb-2">
                    You've successfully redeemed <span className="font-medium text-foreground">{redeemState.option.title}</span>
                  </p>
                  <p className="text-sm text-muted-foreground font-light mb-6">
                    {redeemState.option.points} points deducted · Remaining balance: <span className="font-medium text-accent">{totalPoints} pts</span>
                  </p>
                  <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <img src={redeemState.option.icon} alt="" className="w-12 h-12 object-contain" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{redeemState.option.title}</p>
                        <p className="text-xs text-muted-foreground font-light">{redeemState.option.desc}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeRedeem}
                    className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    Done <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
