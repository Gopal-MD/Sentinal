import { AlertTriangle, Info, ShieldCheck, MapPin } from "lucide-react";

const alerts = [
  { id: 1, type: "critical", msg: "Flash Flood Warning: NH48 Lonavala section", time: "12 mins ago", location: "Maharashtra" },
  { id: 2, type: "warning", msg: "High traffic congestion: Bangalore Electronic City", time: "24 mins ago", location: "Karnataka" },
  { id: 3, type: "info", msg: "Reroute approved: Shipment MH-2847 via Nashik", time: "45 mins ago", location: "North Zone" },
  { id: 4, type: "success", msg: "Delivered: SH-9921 Bangalore Warehouse", time: "1 hr ago", location: "Karnataka" },
];

export default function AlertsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[450px] flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900">Live Incident Feed</h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">4 New</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start space-x-3">
            <div className={`mt-1 p-1.5 rounded-full ${
              alert.type === 'critical' ? 'bg-red-100 text-red-600' :
              alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
              alert.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {alert.type === 'critical' ? <AlertTriangle size={16} /> :
               alert.type === 'info' ? <Info size={16} /> :
               alert.type === 'success' ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{alert.msg}</p>
              <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                <span className="flex items-center"><MapPin size={10} className="mr-0.5" /> {alert.location}</span>
                <span>•</span>
                <span>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="p-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100">
        View All Incidents
      </button>
    </div>
  );
}
