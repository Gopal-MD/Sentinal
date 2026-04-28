import {
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  Megaphone,
  Settings,
  Shield,
  SlidersHorizontal,
  Users,
} from "lucide-react";

const sections = [
  {
    icon: Globe,
    title: "Organization Profile",
    desc: "Company branding, headquarters, timezone, and operating region.",
    details: ["SENTINEL Supply Chain Operations", "Mumbai HQ, India", "Asia/Kolkata timezone"],
  },
  {
    icon: Users,
    title: "User Management",
    desc: "Manage 42 active users across planning, logistics, and compliance teams.",
    details: ["12 planners", "18 operations users", "12 read-only reviewers"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    desc: "SOC 2 controls, 2FA enforcement, IP allowlisting, and audit logs.",
    details: ["2FA required", "SSO via Google Workspace", "Audit logs retained for 365 days"],
  },
  {
    icon: Bell,
    title: "Notification Rules",
    desc: "Configure alert thresholds, escalation paths, and delivery channels.",
    details: ["Critical incidents: immediate", "Warnings: 10 minute digest", "Email + Slack routing"],
  },
  {
    icon: CreditCard,
    title: "Billing & Subscription",
    desc: "Enterprise plan, seat limits, and invoice history.",
    details: ["Enterprise plan", "48 / 60 seats used", "Next invoice: 12 May 2026"],
  },
];

const toggles = [
  { label: "Auto-reroute approvals", value: "Enabled" },
  { label: "Risk scan cadence", value: "Every 5 minutes" },
  { label: "Weather alert escalation", value: "Critical only" },
  { label: "Shipment retention", value: "90 days" },
];

const integrations = [
  { icon: Building2, name: "Firebase Realtime Database", status: "Connected" },
  { icon: Lock, name: "Google Cloud Vertex AI", status: "Connected" },
  { icon: Megaphone, name: "Slack / Email routing", status: "Active" },
  { icon: SlidersHorizontal, name: "Google Maps & routing", status: "Enabled" },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-500">
            Configure platform behavior, access controls, and alert routing for the operational team.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Autosaved 2 minutes ago
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Workspace" value="SENTINEL Main" helper="Production environment" />
        <StatCard label="Users" value="42 active" helper="5 teams connected" />
        <StatCard label="Alerts" value="17 rules" helper="3 critical" />
        <StatCard label="Integrations" value="4 live" helper="All systems healthy" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/60 px-6 py-4">
              <h2 className="font-bold text-gray-900">Core Settings</h2>
              <p className="text-sm text-gray-500">Primary controls that shape how SENTINEL operates.</p>
            </div>
            <div className="divide-y divide-gray-100">
              {sections.map((item) => (
                <div key={item.title} className="group flex items-start justify-between gap-4 px-6 py-5 transition hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-gray-100 p-3 text-gray-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.details.map((detail) => (
                          <span key={detail} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="mt-1 text-gray-300 transition group-hover:text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">Alert Defaults</h2>
              <p className="mt-1 text-sm text-gray-500">These values are used when new routes or teams are created.</p>
              <div className="mt-5 space-y-3">
                {toggles.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">Connected Integrations</h2>
              <p className="mt-1 text-sm text-gray-500">Live services currently linked to the operations workspace.</p>
              <div className="mt-5 space-y-3">
                {integrations.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Operational and healthy</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-3 text-white">
                <Settings size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Need Enterprise Support?</h2>
                <p className="text-sm text-gray-600">Solutions engineers can review your setup and adjust workflows.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <p>• Review security and compliance configuration.</p>
              <p>• Tune risk thresholds for different shipment classes.</p>
              <p>• Connect additional teams, vendors, or alert channels.</p>
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Contact Support
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900">Quick Notes</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <p>The settings area is intentionally read-friendly until persistence is connected.</p>
              <p>Next update can turn these cards into editable forms and save to Firebase.</p>
              <p>For the demo, this page now shows actual configuration content instead of an empty UI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{helper}</p>
    </div>
  );
}
