import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Users,
  FileText,
  Phone,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
} from "lucide-react";
import iconHealthInsurance from "@/assets/icons/health-insurance.png";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const coverageItems = [
  { label: "In-patient", value: "Full cover", included: true },
  { label: "Out-patient", value: "€1,500/yr", included: true },
  { label: "Dental", value: "€750/yr", included: true },
  { label: "Vision", value: "€300/yr", included: true },
  { label: "Mental Health", value: "12 sessions/yr", included: true },
  { label: "Maternity", value: "Full cover", included: true },
];

const faqs = [
  { q: "Who is covered under this plan?", a: "You and your immediate dependents (spouse/partner and children up to 26)." },
  { q: "When does the coverage start?", a: "Coverage begins on your first day of employment. No waiting period for standard benefits." },
  { q: "How do I make a claim?", a: "Submit claims through the Happl app or email claims@happl.com with your receipts." },
];

export default function BenefitInsurance() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[900px]">
      <motion.button variants={fadeUp} onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Back
      </motion.button>

      {/* Hero card */}
      <motion.div variants={fadeUp} className="rounded-2xl bg-gradient-to-r from-primary to-happl-teal-light p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <img src={iconHealthInsurance} alt="Health Insurance" className="w-20 h-20 object-contain" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-primary-foreground">Health Insurance</h1>
                <span className="happl-badge bg-accent/20 text-accent text-xs">Enrolled</span>
              </div>
              <p className="text-primary-foreground/70 mt-1">Comprehensive medical, dental & vision coverage</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-foreground/60">Your cost</p>
            <p className="text-2xl font-bold text-accent">€0/mo</p>
            <p className="text-xs text-primary-foreground/50">Company paid</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-accent" />
            <div>
              <p className="text-xs text-primary-foreground/60">Covered</p>
              <p className="text-sm font-medium text-primary-foreground">You + Family</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-accent" />
            <div>
              <p className="text-xs text-primary-foreground/60">Policy</p>
              <p className="text-sm font-medium text-primary-foreground">AXA Gold Plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-accent" />
            <div>
              <p className="text-xs text-primary-foreground/60">Support</p>
              <p className="text-sm font-medium text-primary-foreground">24/7 Helpline</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-foreground mb-4">What's Covered</h2>
            <div className="happl-card-static space-y-0 divide-y divide-border">
              {coverageItems.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                      <Check size={12} className="text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div key={i} className="happl-card-static cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{faq.q}</p>
                    {openFaq === i ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </div>
                  <motion.div initial={false} animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }} className="overflow-hidden">
                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">{faq.a}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="col-span-2 space-y-4">
          <div className="happl-card-static">
            <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => navigate("/enroll/health-insurance")} className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded-lg text-sm font-semibold hover:brightness-95 transition-all">Manage Plan</button>
              <button className="w-full flex items-center justify-center gap-2 border border-border py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all">
                <FileText size={14} /> View Policy
              </button>
            </div>
          </div>
          <div className="happl-card-static">
            <h3 className="font-semibold text-foreground mb-3">Documents</h3>
            <div className="space-y-2">
              {["Policy Document", "Member Handbook", "Claim Form"].map((doc) => (
                <button key={doc} className="w-full flex items-center justify-between py-2 text-sm text-foreground hover:text-accent transition-colors">
                  <span className="flex items-center gap-2"><Download size={14} className="text-muted-foreground" />{doc}</span>
                  <ExternalLink size={12} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
          <div className="happl-card-static">
            <h3 className="font-semibold text-foreground mb-3">Provider</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground">AXA</div>
              <div>
                <p className="text-sm font-medium text-foreground">AXA Insurance</p>
                <p className="text-xs text-muted-foreground">Gold Plan</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Helpline: 1800 200 400 (24/7)</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
