import VendorTable from "@/components/Vendor/VendorTable";
import { UserPlus, Download, TrendingUp } from "lucide-react";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Ecosystem</h1>
          <p className="text-gray-500">Manage carriers, suppliers, and 3PL partners with automated performance scoring.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export Metrics</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <UserPlus size={16} />
            <span>Onboard Partner</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between">
             <p className="text-sm text-gray-500 font-medium">Avg On-Time Rate</p>
             <TrendingUp size={16} className="text-green-600" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">91.4%</h2>
           <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
              <div className="bg-green-500 h-full w-[91%]" />
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-sm text-gray-500 font-medium">Vendor Quality Index</p>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">4.6/5.0</h2>
           <div className="flex items-center mt-3 text-yellow-400">
             {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-sm text-gray-500 font-medium">Cost Competitiveness</p>
           <h2 className="text-2xl font-bold text-gray-900 mt-1">₹1.4K</h2>
           <p className="text-xs text-gray-400 font-bold mt-2">Avg cost per lane unit</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
           <h3 className="font-bold text-gray-900">Partner Performance Matrix</h3>
        </div>
        <VendorTable />
      </div>
    </div>
  );
}
