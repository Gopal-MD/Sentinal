import { CloudRain, Wind, Thermometer, CloudLightning } from "lucide-react";

export default function WeatherWidget() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Strategic Weather Layer</h3>
        <span className="text-xs font-bold text-red-600 animate-pulse">2 Active Hazards</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
            <CloudLightning size={40} />
          </div>
          <div>
            <p className="text-3xl font-bold">28°C</p>
            <p className="text-sm text-gray-500 font-medium">Thunderstorms • Pune, MH</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">Heavy Rainfall</p>
          <p className="text-xs text-gray-500">NH48 Connectivity: 42%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <Wind size={18} className="mx-auto mb-1 text-gray-400" />
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-bold">24 km/h</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <CloudRain size={18} className="mx-auto mb-1 text-gray-400" />
          <p className="text-xs text-gray-500">Precip</p>
          <p className="text-sm font-bold">12mm/h</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <Thermometer size={18} className="mx-auto mb-1 text-gray-400" />
          <p className="text-xs text-gray-500">Visibility</p>
          <p className="text-sm font-bold">1.2 km</p>
        </div>
      </div>
    </div>
  );
}
