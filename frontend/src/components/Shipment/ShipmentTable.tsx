"use client";

import { MoreHorizontal, ExternalLink, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";

const shipments = [
  { id: "SH-2847", origin: "Mumbai, MH", dest: "Bangalore, KA", carrier: "Bharat Logistics", status: "at_risk", risk: 0.87, eta: "Today 20:15" },
  { id: "SH-9921", origin: "Delhi, DL", dest: "Chennai, TN", carrier: "Swift Express", status: "on_time", risk: 0.12, eta: "Tomorrow 09:00" },
  { id: "SH-4432", origin: "Hyderabad, TG", dest: "Mumbai, MH", carrier: "Indo-Global", status: "delayed", risk: 0.65, eta: "Today 23:45" },
  { id: "SH-1102", origin: "Pune, MH", dest: "Ahmedabad, GJ", carrier: "Bharat Logistics", status: "on_time", risk: 0.05, eta: "Today 16:30" },
  { id: "SH-8873", origin: "Kolkata, WB", dest: "Delhi, DL", carrier: "Swift Express", status: "rerouted", risk: 0.42, eta: "Tomorrow 14:00" },
];

export default function ShipmentTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4">Shipment ID</th>
            <th className="px-6 py-4">Origin & Destination</th>
            <th className="px-6 py-4">Carrier</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Risk Score</th>
            <th className="px-6 py-4">ETA</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm">
          {shipments.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4 font-bold text-blue-600">{s.id}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{s.origin}</span>
                  <span className="text-xs text-gray-400">to {s.dest}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{s.carrier}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                  s.status === 'on_time' ? 'bg-green-100 text-green-700' :
                  s.status === 'at_risk' ? 'bg-red-100 text-red-700' :
                  s.status === 'delayed' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {s.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4">
                 <div className="flex items-center">
                    <div className="w-16 bg-gray-100 h-1.5 rounded-full mr-2 overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${s.risk > 0.7 ? 'bg-red-500' : s.risk > 0.4 ? 'bg-orange-400' : 'bg-green-500'}`}
                         style={{ width: `${s.risk * 100}%` }}
                       />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{(s.risk * 100).toFixed(0)}%</span>
                 </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {s.eta}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={`/shipments/${s.id}`} className="inline-flex items-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <ExternalLink size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/30">
        <p>Showing 5 of 52 active shipments</p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors font-bold text-blue-600 bg-white">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">3</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
