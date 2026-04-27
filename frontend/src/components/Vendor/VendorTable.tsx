"use client";

import { Star, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

const vendors = [
  { id: "V-001", name: "Bharat Logistics", type: "Carrier", onTime: 96, quality: 4.8, cost: "Low", status: "Premium" },
  { id: "V-002", name: "Swift Express 3PL", type: "3PL", onTime: 89, quality: 4.2, cost: "Mid", status: "Active" },
  { id: "V-003", name: "Precision Parts Corp", type: "Supplier", onTime: 92, quality: 4.5, cost: "High", status: "Strategic" },
  { id: "V-004", name: "Indo-Global Freight", type: "Carrier", onTime: 81, quality: 3.9, cost: "Low", status: "Under Review" },
  { id: "V-005", name: "Solaris Systems", type: "Supplier", onTime: 94, quality: 4.7, cost: "Mid", status: "Strategic" },
];

export default function VendorTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4">Partner Name</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">On-Time %</th>
            <th className="px-6 py-4">Quality Score</th>
            <th className="px-6 py-4">Cost Index</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm">
          {vendors.map((v) => (
            <tr key={v.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">{v.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{v.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">{v.type}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <span className={`font-bold ${v.onTime > 90 ? 'text-green-600' : v.onTime > 85 ? 'text-orange-500' : 'text-red-500'}`}>
                    {v.onTime}%
                  </span>
                  {v.onTime > 90 ? <TrendingUp size={14} className="ml-1 text-green-500" /> : <TrendingDown size={14} className="ml-1 text-red-400" />}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-yellow-500">
                  <Star size={14} fill="currentColor" className="mr-1" />
                  <span className="font-bold text-gray-700">{v.quality}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  v.cost === 'Low' ? 'bg-blue-100 text-blue-700' : v.cost === 'Mid' ? 'bg-gray-100 text-gray-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {v.cost} Cost
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  v.status === 'Strategic' ? 'bg-purple-100 text-purple-700' :
                  v.status === 'Premium' ? 'bg-green-100 text-green-700' :
                  v.status === 'Under Review' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {v.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
