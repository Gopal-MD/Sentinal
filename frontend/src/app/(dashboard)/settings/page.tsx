import { Settings, Users, Shield, Globe, Bell, CreditCard, ChevronRight } from "lucide-react";

const sections = [
  { icon: Globe, title: "Organization Profile", desc: "Company branding, headquarters, and global settings" },
  { icon: Users, title: "User Management", desc: "Manage 42 active users across 5 operational teams" },
  { icon: Shield, title: "Security & Compliance", desc: "SOC II, 2FA, IP Whitelisting, and Audit Logs" },
  { icon: Bell, title: "Notification Rules", desc: "Configure alert thresholds and escalation paths" },
  { icon: CreditCard, title: "Billing & Subscription", desc: "Enterprise plan, invoice history, and limits" },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
        <p className="text-gray-500">Configure global platform behavior and manage organizational security.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {sections.map((item) => (
            <button key={item.title} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
               <div className="flex items-center space-x-4">
                 <div className="p-3 bg-gray-100 text-gray-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <item.icon size={22} />
                 </div>
                 <div className="text-left">
                   <p className="font-bold text-gray-900">{item.title}</p>
                   <p className="text-sm text-gray-500">{item.desc}</p>
                 </div>
               </div>
               <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-blue-100">
         <div className="relative z-10">
           <h3 className="text-xl font-bold mb-2">Need Enterprise Support?</h3>
           <p className="text-blue-100 text-sm max-w-md">Our dedicated solutions engineers are available 24/7 to help you optimize your supply chain workflows.</p>
           <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
             Contact Support
           </button>
         </div>
         <Settings size={180} className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none" />
      </div>
    </div>
  );
}
