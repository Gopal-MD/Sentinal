"use client";

import Link from "next/link";
import { ShieldCheck, Users, Mail, ArrowRight } from "lucide-react";

const benefits = [
  "Role-based access for planners, operators, and reviewers",
  "Google Workspace login and 2FA support",
  "Connected to live risk, inventory, and weather signals",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <section className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <ShieldCheck size={16} />
            Request platform access
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Join the SENTINEL operations workspace.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Set up access for your team and connect the tools you already use for shipment visibility, risk scoring, and warehouse control.
            </p>
          </div>

          <div className="space-y-3">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                <div className="mt-0.5 rounded-full bg-emerald-50 p-2 text-emerald-600">
                  <Users size={16} />
                </div>
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            Already have an account? <Link href="/login" className="font-semibold text-blue-700 hover:underline">Sign in</Link>
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Access request</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Tell us about your team</h2>
            </div>

            <div className="space-y-4">
              <Field label="Full name" placeholder="Aarav Mehta" />
              <Field label="Work email" placeholder="aarav@company.com" type="email" icon={<Mail size={16} />} />
              <Field label="Company" placeholder="Acme Logistics" />
              <Field label="Team size" placeholder="25-50 users" />
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Your request will be reviewed and a workspace admin can approve account creation.
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Submit request
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
        {icon && <span className="text-slate-400">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
        />
      </div>
    </label>
  );
}