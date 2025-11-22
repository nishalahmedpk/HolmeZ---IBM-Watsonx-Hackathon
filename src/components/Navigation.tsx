import { NavLink } from "react-router-dom";
import { ShoppingBag, BarChart3 } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold hidden sm:block">Sales Dashboard</span>
          </div>
          
          <div className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`
              }
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Orders</span>
            </NavLink>
            
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`
              }
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden sm:inline">Reports</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
