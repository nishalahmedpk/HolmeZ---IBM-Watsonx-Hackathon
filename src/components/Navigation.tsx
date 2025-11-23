import { useLocation } from "react-router-dom";
import { ShoppingBag, BarChart3, ClipboardCheck } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClass = (path: string) => {
    return `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${isActive(path)
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            <span className="text-xl font-semibold text-foreground hidden sm:block">Sales Dashboard</span>
          </div>

          <div className="flex gap-2">
            <a
              href="/"
              className={getLinkClass("/")}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Orders</span>
            </a>

            <a
              href="/reports"
              className={getLinkClass("/reports")}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden sm:inline">Reports</span>
            </a>

            <a
              href="/fulfillment"
              className={getLinkClass("/fulfillment")}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span className="hidden sm:inline">Fulfillment</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
