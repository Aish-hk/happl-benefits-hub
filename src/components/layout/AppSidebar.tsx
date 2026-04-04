import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import happlLogo from "@/assets/happl-logo.png";
import happlIcon from "@/assets/happl-icon.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Benefits", path: "/marketplace" },
  { label: "Spend", path: "/spend" },
  { label: "Rewards", path: "/rewards" },
];

const bottomItems = [
  { label: "Help", path: "/help" },
  { label: "Settings", path: "/settings" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-primary flex flex-col z-50 overflow-hidden"
    >
      {/* Logo */}
      <div className={`px-4 py-6 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
        <motion.div className="flex items-center gap-2 overflow-hidden">
          {collapsed ? (
            <img src={happlIcon} alt="Happl" className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <img src={happlLogo} alt="Happl" className="h-8 object-contain" />
          )}
        </motion.div>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft size={16} className="text-sidebar-foreground/60" />
          </button>
        )}
      </div>

      {/* Main Nav — hidden when collapsed, text only when expanded */}
      {!collapsed ? (
        <nav className="flex-1 px-2">
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-accent font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 font-light"
                    }`}
                  >
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
      ) : (
        <div className="flex-1" />
      )}

      {/* Bottom */}
      <div className="px-2 pb-4">
        {!collapsed && (
          <div className="border-t border-sidebar-border pt-3 space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-light text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-light text-sidebar-foreground/60 hover:text-destructive hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        {!collapsed && (
          <div className="mt-4 px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">
              SM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Sarah Mitchell
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate font-light">
                Acme Corp
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <button onClick={onToggle} className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">
              SM
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
