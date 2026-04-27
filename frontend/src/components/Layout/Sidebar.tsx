"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Warehouse, 
  Users, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  ChevronLeft,
  Menu
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Truck, label: "Shipments", href: "/shipments" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Warehouse, label: "Warehouse", href: "/warehouse" },
  { icon: Users, label: "Vendors", href: "/vendors" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: AlertTriangle, label: "Alerts", href: "/alerts" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-slate-900 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <span className="font-bold text-xl tracking-tight">SENTINEL</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-slate-800 rounded">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-lg transition-colors group",
                active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={22} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-white")} />
              {!collapsed && <span className="ml-4 font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        {!collapsed && (
          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-xs text-slate-400">System Status</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-sm font-medium uppercase tracking-wider text-green-400">Operational</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
