import { BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NoData() {
  return (
    <div className="glass-card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
      <BarChart3 className="w-16 h-16 text-muted-foreground/30 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Data Available</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        There are no sales records for the selected date range.
        Try selecting a different date range or create some orders first.
      </p>
      <Link to="/">
        <Button size="lg" className="gap-2">
          Create Order <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
