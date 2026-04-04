import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Heart,
  Wallet,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const quickStats = [
  { label: "Active Benefits", value: "5", icon: CheckCircle2, color: "bg-accent/15 text-accent" },
  { label: "Pending Enrollment", value: "2", icon: Clock, color: "bg-happl-warning/15 text-happl-warning" },
  { label: "Total Coverage", value: "€24,000", icon: Shield, color: "bg-happl-info/15 text-happl-info" },
  { label: "Savings This Year", value: "€3,200", icon: TrendingUp, color: "bg-accent/15 text-accent" },
];

const featuredBenefits = [
  {
    id: "health-insurance",
    title: "Health Insurance",
    subtitle: "Comprehensive medical, dental & vision",
    icon: Heart,
    tag: "Popular",
    tagColor: "bg-accent text-accent-foreground",
    gradient: "from-[#163b3b] to-[#1f4f4f]",
  },
  {
    id: "flex-allowance",
    title: "Flex Allowance",
    subtitle: "€150/month for wellness & lifestyle",
    icon: Wallet,
    tag: "New",
    tagColor: "bg-happl-warning/20 text-happl-warning",
    gradient: "from-[#04E898] to-[#02b574]",
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    subtitle: "4x salary coverage included",
    icon: Shield,
    tag: "Enrolled",
    tagColor: "bg-muted text-muted-foreground",
    gradient: "from-[#3B82F6] to-[#2563EB]",
  },
];

const recentActivity = [
  { action: "Health Insurance claim approved", time: "2 hours ago", icon: CheckCircle2 },
  { action: "Flex allowance — €45 gym membership", time: "Yesterday", icon: Wallet },
  { action: "Dental check-up reimbursed", time: "3 days ago", icon: Heart },
];

export default function BenefitsHome() {
  const navigate = useNavigate();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1100px]">
      {/* Greeting */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">
          Good morning, Sarah 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your employee benefits at Acme Corp.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="happl-card flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enrollment Banner */}
      <motion.div
        variants={fadeUp}
        whileHover={{ scale: 1.005 }}
        className="rounded-2xl bg-gradient-to-r from-primary to-happl-teal-light p-6 mb-8 flex items-center justify-between cursor-pointer"
        onClick={() => navigate("/marketplace")}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Zap size={22} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-foreground">
              Open Enrollment Window
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Explore and activate new benefits — enrollment closes in 14 days
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          Explore Benefits
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Featured Benefits */}
        <div className="col-span-2">
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-foreground">Featured Benefits</h2>
            <button
              onClick={() => navigate("/marketplace")}
              className="text-sm text-accent font-medium flex items-center gap-1 hover:underline"
            >
              View all <ChevronRight size={14} />
            </button>
          </motion.div>
          <div className="space-y-3">
            {featuredBenefits.map((b, i) => (
              <motion.div
                key={b.id}
                variants={fadeUp}
                whileHover={{ scale: 1.01, x: 4 }}
                className="happl-card flex items-center gap-4 cursor-pointer"
                onClick={() =>
                  navigate(
                    b.id === "flex-allowance"
                      ? "/benefit/allowance"
                      : "/benefit/insurance"
                  )
                }
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center`}
                >
                  <b.icon size={20} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{b.title}</h3>
                    <span className={`happl-badge text-[10px] ${b.tagColor}`}>
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{b.subtitle}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp}>
          <h2 className="text-xl font-serif text-foreground mb-4">Recent Activity</h2>
          <div className="happl-card-static space-y-4">
            {recentActivity.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                  <a.icon size={14} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
