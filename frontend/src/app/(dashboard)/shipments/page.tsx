import ShipmentTable from "@/components/Shipment/ShipmentTable";
import { Plus, Download, Filter } from "lucide-react";

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipment Hub</h1>
          <p className="text-gray-500">Manage and monitor all active and historical freight movements.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>New Shipment</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
             <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">All Shipments</button>
             <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-50 whitespace-nowrap">At Risk</button>
             <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-50 whitespace-nowrap">Delayed</button>
             <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-50 whitespace-nowrap">Delivered</button>
           </div>
           <button className="flex items-center space-x-2 text-gray-600 text-sm font-medium">
             <Filter size={16} />
             <span>Advanced Filters</span>
           </button>
        </div>
        <ShipmentTable />
      </div>
    </div>
  );
}
