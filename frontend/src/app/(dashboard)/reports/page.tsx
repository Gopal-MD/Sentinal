import { BarChart3, FileText, Download, Calendar, Filter, PieChart, Activity } from "lucide-react";

const reports = [
  { title: "Daily Operational Summary", type: "Executive", lastRun: "Today, 06:00 AM", status: "Ready" },
  { title: "Carrier Performance Monthly", type: "Strategic", lastRun: "Apr 01, 2026", status: "Ready" },
  { title: "Inventory Turnover Analysis", type: "Operational", lastRun: "Today, 08:30 AM", status: "Ready" },
  { title: "Route Cost Optimization", type: "Financial", lastRun: "Yesterday, 11:45 PM", status: "Ready" },
  { title: "Regional Risk Distribution", type: "Security", lastRun: "2 hours ago", status: "Ready" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Intelligence & Reports</h1>
          <p className="text-gray-500">Access deep-dive analytics and generate custom operational reports.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center">
          <BarChart3 size={18} className="mr-2" />
          Create Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
               <h3 className="font-bold text-gray-900">Automated Intelligence Reports</h3>
               <div className="flex items-center space-x-2">
                 <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Filter size={16} /></button>
                 <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Calendar size={16} /></button>
               </div>
             </div>
             <div className="divide-y divide-gray-50">
               {reports.map((report) => (
                 <div key={report.title} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{report.title}</p>
                        <div className="flex items-center mt-0.5 space-x-3 text-xs text-gray-500">
                           <span className="font-medium px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{report.type}</span>
                           <span>Last generated: {report.lastRun}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                       <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">{report.status}</span>
                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                         <Download size={18} />
                       </button>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[300px] flex flex-col items-center justify-center border-dashed">
                <PieChart size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-medium">Cost Breakdown by Carrier</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[300px] flex flex-col items-center justify-center border-dashed">
                <Activity size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-medium">Monthly Transit Delay Histogram</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl">
              <h3 className="font-bold mb-4 flex items-center text-blue-400">
                <BarChart3 size={18} className="mr-2" />
                Quick Insights
              </h3>
              <div className="space-y-6 mt-4">
                 <div className="border-l-2 border-blue-500 pl-4 py-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Top Delay Reason</p>
                    <p className="text-sm font-bold">Unseasonal Rainfall (MH)</p>
                 </div>
                 <div className="border-l-2 border-purple-500 pl-4 py-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Cost Optimization</p>
                    <p className="text-sm font-bold">Consolidation saves 14%</p>
                 </div>
                 <div className="border-l-2 border-green-500 pl-4 py-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Vendor Peak</p>
                    <p className="text-sm font-bold">Bharat Logistics (98%)</p>
                 </div>
              </div>
              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-bold transition-all">
                Download PDF Summary
              </button>
           </div>

           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Scheduled Exports</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                    <span className="font-medium">Weekly Ops Log</span>
                    <span className="text-blue-600 font-bold">Mon, 8AM</span>
                 </div>
                 <div className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                    <span className="font-medium">Monthly Costing</span>
                    <span className="text-blue-600 font-bold">1st, 10AM</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
