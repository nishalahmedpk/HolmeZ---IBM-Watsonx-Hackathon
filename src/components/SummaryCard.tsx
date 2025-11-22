import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="glass-card p-6" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-xl bg-white/5"
          style={{ color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
