import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="glass-card p-6" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-lg bg-secondary"
          style={{ color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
