
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ChefHat, 
  Clipboard, 
  Coffee, 
  LayoutDashboard, 
  Menu, 
  Settings, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({ to, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "border-r bg-restaurant-900 text-white h-screen transition-all flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-restaurant-800">
        <div className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
          <Coffee size={24} className="text-gold-400" />
          <h1 className="font-bold text-xl">DineFlow</h1>
        </div>
        {isCollapsed && <Coffee size={24} className="text-gold-400 mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-restaurant-800"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-2 flex-1">
        <SidebarLink
          to="/"
          icon={LayoutDashboard}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/orders"
          icon={Clipboard}
          label="Orders"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/menu"
          icon={ChefHat}
          label="Menu Management"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/analytics"
          icon={BarChart3}
          label="Analytics"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isCollapsed}
        />
      </div>

      <div className="p-4 border-t border-restaurant-800">
        <div className={cn("flex items-center gap-3", isCollapsed && "hidden")}>
          <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold">
            R
          </div>
          <div>
            <p className="text-sm font-medium">Restaurant Admin</p>
            <p className="text-xs text-gray-400">admin@dineflow.com</p>
          </div>
        </div>
        {isCollapsed && (
          <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold mx-auto">
            R
          </div>
        )}
      </div>
    </div>
  );
}
