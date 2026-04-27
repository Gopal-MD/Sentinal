import KPICards from "@/components/Dashboard/KPICards";
import ShipmentChart from "@/components/Dashboard/ShipmentChart";
import AlertsPanel from "@/components/Dashboard/AlertsPanel";
import WeatherWidget from "@/components/Dashboard/WeatherWidget";
import NLQueryBox from "@/components/Chat/NLQueryBox";
import RegionalRiskMap from "@/components/Map/RegionalRiskMap";

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operations Control Center</h1>
          <p className="text-gray-500">Real-time supply chain monitoring and AI-driven risk assessment.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Run Global Scan
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <KPICards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Charts & Heatmap */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Shipment Delay Trends</h3>
            <div className="h-[300px] w-full">
               <ShipmentChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Regional Risk Heatmap</h3>
              <div className="h-[250px] overflow-hidden rounded-lg">
                <RegionalRiskMap />
              </div>
            </div>
            <WeatherWidget />
          </div>
        </div>

        {/* Right Column: Feed & Chat */}
        <div className="space-y-6">
          <AlertsPanel />
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="bg-purple-100 text-purple-700 p-1 rounded mr-2">✨</span>
              Sentinel Assistant
            </h3>
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
               <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic">
                 "Hello! Ask me about shipments at risk or inventory levels."
               </div>
            </div>
            <NLQueryBox />
          </div>
        </div>
      </div>
    </div>
  );
}
