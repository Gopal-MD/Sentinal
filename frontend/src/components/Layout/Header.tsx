"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-96">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Global search (Shipments, SKUs, Vendors...)" 
          className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
        />
      </div>

      <div className="flex items-center space-y-0 space-x-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2" />

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 hover:bg-gray-50 p-1 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-900 leading-tight">Admin User</p>
              <p className="text-xs text-gray-500 leading-tight">System Administrator</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <User size={16} className="mr-2" /> Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                <LogOut size={16} className="mr-2" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
