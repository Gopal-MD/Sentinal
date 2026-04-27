import InventoryTable from "@/components/Inventory/InventoryTable";
import { Plus, Download, Search } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Hub</h1>
          <p className="text-gray-500">Monitor stock levels across all distribution centers in real-time.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>Add SKU</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-sm text-gray-500 font-medium">Total Stock Value</p>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">₹8.24 Cr</h2>
           <p className="text-xs text-green-600 font-bold mt-2">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-sm text-gray-500 font-medium">Low Stock Alerts</p>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">12 Items</h2>
           <p className="text-xs text-red-600 font-bold mt-2">Requires immediate reorder</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-sm text-gray-500 font-medium">Warehouse Utilization</p>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">78.4%</h2>
           <p className="text-xs text-blue-600 font-bold mt-2">Optimized storage</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 w-full md:w-80">
             <Search size={16} className="text-gray-400" />
             <input 
               type="text" 
               placeholder="Search by SKU or name..." 
               className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
             />
           </div>
           <div className="flex items-center space-x-2">
             <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 text-gray-600 outline-none">
               <option>All Warehouses</option>
               <option>Mumbai Hub</option>
               <option>Delhi Hub</option>
               <option>Bangalore Hub</option>
             </select>
             <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 text-gray-600 outline-none">
               <option>All Categories</option>
               <option>Electronics</option>
               <option>Pharma</option>
               <option>Energy</option>
             </select>
           </div>
        </div>
        <InventoryTable />
      </div>
    </div>
  );
}
