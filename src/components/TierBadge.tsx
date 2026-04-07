import { tierConfig, type TierType } from "@/lib/benefits-config";

interface TierBadgeProps {
  tier: TierType;
  className?: string;
}

export default function TierBadge({ tier, className = "" }: TierBadgeProps) {
  const config = tierConfig[tier];
  return (
    <span className={`happl-badge text-[10px] ${config.color} ${className}`}>
      {config.label}
    </span>
  );
}
