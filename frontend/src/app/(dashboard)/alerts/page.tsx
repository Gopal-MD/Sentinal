import { AlertTriangle, MapPin, Clock, Filter, Bell, ShieldAlert, ChevronRight } from "lucide-react";

const incidents = [
  { 
    id: "INC-902", 
    type: "critical", 
    title: "Flash Flood Warning: NH48", 
    desc: "Severe flooding detected near Lonavala. 4 shipments currently in vicinity.", 
    time: "12 mins ago", 
    location: "Maharashtra, IN",
    impact: "High" 
  },
  { 
    id: "INC-884", 
    type: "warning", 
    title: "Port Congestion: JNPT", 
    desc: "Expected vessel docking delay of 18-24 hours due to labor strike.", 
    time: "1 hour ago", 
    location: "Mumbai, IN",
    impact: "Medium" 
  },
  { 
    id: "INC-871", 
    type: "info", 
    title: "System Update: Reroute Logic", 
    desc: "AI Risk Engine v2.4 deployed. Improved rainfall impact analysis.", 
    time: "3 hours ago", 
    location: "Cloud Central",
    impact: "None" 
  },
];

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Control Center</h1>
          <p className="text-gray-500">Real-time monitoring of supply chain disruptions and system alerts.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Bell size={16} />
            <span>Manage Rules</span>
          </button>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            <ShieldAlert size={16} />
            <span>Broadcast Alert</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Statistics */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Critical Incidents</p>
              <h2 className="text-3xl font-black text-red-700">04</h2>
           </div>
           <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Active Warnings</p>
              <h2 className="text-3xl font-black text-orange-700">12</h2>
           </div>
           <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Notifications Today</p>
              <h2 className="text-3xl font-black text-blue-700">42</h2>
           </div>
        </div>

        {/* Incident List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
               <h3 className="font-bold text-gray-900">Live Incident Feed</h3>
               <button className="text-sm font-medium text-blue-600 flex items-center">
                 <Filter size={14} className="mr-1" /> Filter
               </button>
            </div>
            <div className="divide-y divide-gray-100">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-6 hover:bg-gray-50 transition-all group flex items-start space-x-4">
                  <div className={`mt-1 p-2 rounded-xl ${
                    inc.type === 'critical' ? 'bg-red-100 text-red-600' :
                    inc.type === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-lg">{inc.title}</h4>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        inc.impact === 'High' ? 'bg-red-100 text-red-700' :
                        inc.impact === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        Impact: {inc.impact}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{inc.desc}</p>
                    <div className="flex items-center mt-4 space-x-4 text-xs font-medium text-gray-400">
                      <span className="flex items-center"><MapPin size={12} className="mr-1" /> {inc.location}</span>
                      <span className="flex items-center"><Clock size={12} className="mr-1" /> {inc.time}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">ID: {inc.id}</span>
                    </div>
                  </div>
                  <button className="self-center p-2 text-gray-300 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full p-4 text-center text-sm font-bold text-gray-500 border-t border-gray-100 hover:bg-gray-50 transition-colors">
              Load Previous Incidents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
