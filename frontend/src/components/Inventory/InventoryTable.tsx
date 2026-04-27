"use client";

import { MoreVertical, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";

const inventory = [
  { id: "SKU-001", name: "Premium Semiconductors", category: "Electronics", warehouse: "MUM-01", qty: 420, min: 150, status: "in_stock", value: "₹24.5L" },
  { id: "SKU-002", name: "Industrial Cooling Units", category: "HVAC", warehouse: "DEL-01", qty: 45, min: 100, status: "critical", value: "₹18.2L" },
  { id: "SKU-003", name: "Lithium Battery Cells", category: "Energy", warehouse: "BLR-01", qty: 180, min: 150, status: "low", value: "₹32.1L" },
  { id: "SKU-004", name: "Precision Sensors", category: "Electronics", warehouse: "MAA-01", qty: 890, min: 200, status: "in_stock", value: "₹12.4L" },
  { id: "SKU-005", name: "Composite Airframe Parts", category: "Aerospace", warehouse: "HYD-01", qty: 12, min: 10, status: "in_stock", value: "₹1.4Cr" },
];

export default function InventoryTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4">SKU ID</th>
            <th className="px-6 py-4">Item Name</th>
            <th className="px-6 py-4">Warehouse</th>
            <th className="px-6 py-4">Stock Level</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Total Value</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 font-mono font-bold text-gray-600">{item.id}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">{item.warehouse}</td>
              <td className="px-6 py-4">
                 <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                       <span>{item.qty} units</span>
                       <span>Min: {item.min}</span>
                    </div>
                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${
                           item.status === 'critical' ? 'bg-red-500' : 
                           item.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                         }`}
                         style={{ width: `${Math.min((item.qty / (item.min * 3)) * 100, 100)}%` }}
                       />
                    </div>
                 </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                  item.status === 'in_stock' ? 'bg-green-100 text-green-700' :
                  item.status === 'critical' ? 'bg-red-100 text-red-700 animate-pulse' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900">{item.value}</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
