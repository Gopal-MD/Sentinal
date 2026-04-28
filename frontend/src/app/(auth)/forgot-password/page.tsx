"use client";

import Link from "next/link";
import { KeyRound, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-6 py-12">
      <div className="mx-auto flex min-h-screen max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            <KeyRound size={16} />
            Password help
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Reset access</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter your work email and we’ll send a reset link if the account exists in your organization.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Work email</span>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </label>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Send reset link
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Remembered it? <Link href="/login" className="font-semibold text-blue-700 hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}