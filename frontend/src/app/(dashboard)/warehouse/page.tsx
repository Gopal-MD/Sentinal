"use client";

import { MapPin, Users, Package, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

const warehouses = [
  { id: "WH-MUM-01", name: "Mumbai Central Hub", city: "Mumbai", usage: 78, capacity: "5,000", staff: 42, active: 12 },
  { id: "WH-DEL-01", name: "NCR Logistics Park", city: "Delhi", usage: 92, capacity: "8,000", staff: 65, active: 18 },
  { id: "WH-BLR-01", name: "Bangalore Tech-Logistics", city: "Bangalore", usage: 64, capacity: "4,000", staff: 30, active: 8 },
  { id: "WH-MAA-01", name: "Chennai Port Depot", city: "Chennai", usage: 45, capacity: "6,000", staff: 55, active: 14 },
  { id: "WH-HYD-01", name: "Hyderabad Distribution", city: "Hyderabad", usage: 82, capacity: "4,500", staff: 38, active: 10 },
];

export default function WarehousePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Network</h1>
        <p className="text-gray-500">Monitor storage capacity and operational efficiency across all logistics nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {warehouses.map((wh) => (
          <Link 
            key={wh.id} 
            href={`/warehouse/${wh.id}`}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Package size={24} />
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  wh.usage > 90 ? 'bg-red-100 text-red-700' : 
                  wh.usage > 80 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                }`}>
                  {wh.usage > 90 ? 'Critical Capacity' : 'Normal Operations'}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{wh.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin size={14} className="mr-1" />
                {wh.city}, India
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-1.5 uppercase">
                    <span>Capacity Utilization</span>
                    <span>{wh.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        wh.usage > 90 ? 'bg-red-500' : wh.usage > 80 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${wh.usage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-xs font-bold">{wh.staff} Staff</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Activity size={16} className="text-gray-400" />
                    <span className="text-xs font-bold">{wh.active} Active Orders</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
               <span className="text-xs font-bold text-gray-400 group-hover:text-blue-600 uppercase">View Operational Details</span>
               <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
