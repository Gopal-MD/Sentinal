"use client";

import Link from "next/link";
import { Truck, ShieldCheck, Zap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
               <Truck size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">SENTINEL</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Login</h1>
            <p className="text-gray-500 mt-2">Enter your enterprise credentials to access the control center.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Work Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-medium">Stay logged in for 30 days</label>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all">
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="font-bold text-blue-600 hover:underline">Request access</Link>
          </p>
        </div>
      </div>

      {/* Right: Branding/Motto */}
      <div className="hidden lg:flex flex-1 bg-slate-950 p-16 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#3b82f6_0%,transparent_50%)]" />
           <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#6366f1_0%,transparent_50%)]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
           <div className="space-y-12">
              <div className="flex items-start space-x-6">
                 <div className="mt-1 bg-white/10 p-3 rounded-2xl backdrop-blur-xl border border-white/10 text-blue-400">
                    <Zap size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Real-time Detection</h3>
                    <p className="text-slate-400 leading-relaxed">AI-powered monitoring of global weather, traffic, and geopolitical events that impact your freight.</p>
                 </div>
              </div>
              <div className="flex items-start space-x-6">
                 <div className="mt-1 bg-white/10 p-3 rounded-2xl backdrop-blur-xl border border-white/10 text-green-400">
                    <ShieldCheck size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Autonomous Recovery</h3>
                    <p className="text-slate-400 leading-relaxed">Intelligent rerouting algorithms that bypass disruptions before they affect your bottom line.</p>
                 </div>
              </div>
           </div>
           
           <div className="mt-24 pt-12 border-t border-white/5">
              <p className="text-white font-bold text-lg">"The future of logistics is proactive, not reactive."</p>
              <p className="text-slate-500 mt-2">SENTINEL Engineering Team</p>
           </div>
        </div>
      </div>
    </div>
  );
}
