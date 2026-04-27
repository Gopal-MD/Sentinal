"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: '08:00', total: 40, delayed: 2 },
  { name: '10:00', total: 45, delayed: 5 },
  { name: '12:00', total: 52, delayed: 8 },
  { name: '14:00', total: 48, delayed: 14 },
  { name: '16:00', total: 55, delayed: 12 },
  { name: '18:00', total: 50, delayed: 6 },
  { name: '20:00', total: 42, delayed: 4 },
];

export default function ShipmentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#94a3b8', fontSize: 12}}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#94a3b8', fontSize: 12}}
        />
        <Tooltip 
          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
        />
        <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
        <Area type="monotone" dataKey="delayed" stroke="#ef4444" fillOpacity={1} fill="url(#colorDelayed)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
