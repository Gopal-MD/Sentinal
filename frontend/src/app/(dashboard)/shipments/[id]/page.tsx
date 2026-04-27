import { ArrowLeft, MapPin, ShieldAlert, Sparkles, Navigation, Clock, Activity } from "lucide-react";
import Link from "next/link";
import ShipmentMap from "@/components/Map/ShipmentMap";

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the map
  const mockCurrentLocation = { lat: 18.5204, lng: 73.8567 }; // Pune
  const mockWaypoints = [
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: 18.5204, lng: 73.8567 }, // Pune
    { lat: 12.9716, lng: 77.5946 }, // Bangalore
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/shipments" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{params.id} Details</h1>
          <div className="flex items-center mt-1 space-x-3 text-sm">
             <span className="text-gray-500">Carrier: Bharat Logistics</span>
             <span className="text-gray-300">|</span>
             <span className="text-red-600 font-bold uppercase tracking-widest text-[10px]">Critical Alert Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Map & Route (60%) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[500px] relative">
             <ShipmentMap currentLocation={mockCurrentLocation} waypoints={mockWaypoints} />
             
             {/* Map Controls Overlay */}
             <div className="absolute top-4 left-4 space-y-2">
                <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                   <p className="text-[10px] font-bold text-gray-400 uppercase">Live Location</p>
                   <p className="text-xs font-bold text-gray-900">18.5204° N, 73.8567° E (Pune, MH)</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                 <Activity size={18} className="mr-2 text-blue-600" />
                 Transit Timeline
               </h3>
               <div className="space-y-4">
                 <div className="flex items-start space-x-3">
                   <div className="w-2 h-2 mt-1.5 bg-blue-600 rounded-full" />
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase">Dispatched</p>
                     <p className="text-sm font-semibold">Mumbai Terminal • 08:30 AM</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-2 h-2 mt-1.5 bg-blue-600 rounded-full" />
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase">Last Ping</p>
                     <p className="text-sm font-semibold">Lonavala Checkpoint • 11:45 AM</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3 opacity-40">
                   <div className="w-2 h-2 mt-1.5 bg-gray-300 rounded-full" />
                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase">Est. Arrival</p>
                     <p className="text-sm font-semibold">Bangalore Hub • 20:15 PM (Delayed)</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4">Cargo Information</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Type</p>
                    <p className="text-sm font-semibold">Perishable (Pharma)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Weight</p>
                    <p className="text-sm font-semibold">1,240 kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Temp Control</p>
                    <p className="text-sm font-semibold text-green-600">Active (4.2°C)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Value</p>
                    <p className="text-sm font-semibold">₹42,50,000</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Risk & Gemini (40%) */}
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-red-900 flex items-center">
                 <ShieldAlert size={20} className="mr-2" />
                 Risk Assessment
               </h3>
               <span className="text-xl font-black text-red-700">87%</span>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-800 font-medium">Weather Exposure</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="w-full bg-red-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: '92%' }} />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-800 font-medium">Traffic Congestion</span>
                  <span className="font-bold">64%</span>
                </div>
                <div className="w-full bg-red-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: '64%' }} />
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Sparkles size={80} className="text-purple-600" />
             </div>
             <h3 className="font-bold text-gray-900 mb-3 flex items-center">
               <span className="bg-purple-100 text-purple-700 p-1 rounded mr-2">✨</span>
               Gemini Intelligence
             </h3>
             <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-100">
               <p className="text-sm text-gray-800 italic leading-relaxed">
                 "NH48 near Lonavala Ghat section is experiencing severe flash flooding due to 65mm/hr rainfall. 
                 Structural integrity of the bypass is under observation. Current route leads directly into a 
                 high-risk zone with an estimated 4.5-hour delay. Rerouting via the Nashik-Pune expressway 
                 is advised."
               </p>
             </div>
             <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center">
                  <Navigation size={18} className="mr-2" />
                  Approve Reroute via Nashik
                </button>
                <button className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  View Cascade Impact
                </button>
             </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-xl border border-gray-800">
             <h3 className="font-bold mb-4 flex items-center">
               <Clock size={18} className="mr-2 text-blue-400" />
               ETA Prediction
             </h3>
             <div className="flex items-end justify-between">
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Projected Arrival</p>
                 <p className="text-2xl font-black text-blue-400">20:15 PM</p>
               </div>
               <div className="text-right">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delay Delta</p>
                 <p className="text-lg font-bold text-red-400">+4.2 hrs</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
