import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Shield,
  Wallet,
  FileText,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
  { label: "My Benefits", icon: Shield, path: "/my-benefits" },
  { label: "Claims", icon: FileText, path: "/claims" },
  { label: "Wallet", icon: Wallet, path: "/wallet" },
];

const bottomItems = [
  { label: "Help", icon: HelpCircle, path: "/help" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-primary flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">H</span>
          </div>
          <span className="text-primary-foreground font-semibold text-lg tracking-tight">
            Happl
          </span>
        </motion.div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3">
        <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-sidebar-accent-foreground/50">
          Main
        </p>
        <ul className="space-y-1">
          {navItems.map((item, i) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-accent text-accent"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4">
        <div className="border-t border-sidebar-border pt-3 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:text-destructive hover:bg-sidebar-accent/50 transition-all duration-200">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* User */}
        <div className="mt-4 px-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
            SS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Sarah Smith
            </p>
            <p className="text-xs text-sidebar-foreground/50 truncate">
              Acme Corp
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
