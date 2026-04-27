import { Truck, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Active Shipments", value: "52", delta: "+3", icon: Truck, color: "blue" },
  { label: "At Risk", value: "14", delta: "+5", icon: AlertCircle, color: "red" },
  { label: "On-Time Rate", value: "94.2%", delta: "-1.2%", icon: CheckCircle, color: "green" },
  { label: "Cost Saved (24h)", value: "₹2.4L", delta: "+₹45K", icon: TrendingUp, color: "purple" },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${kpi.color}-50 text-${kpi.color}-600`}>
              <kpi.icon size={24} />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              kpi.delta.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {kpi.delta}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</h2>
        </div>
      ))}
    </div>
  );
}
