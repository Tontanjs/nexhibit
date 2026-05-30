"use client";

import { useState } from "react";
import { Shield, Bell, Eye, Database, User, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { cn } from "@/lib/utils";

const p = copy.pages.student.settings;

type Section = "Account" | "Privacy" | "Notifications" | "Visibility" | "Data";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "Account", label: p.sectionAccount, icon: User },
  { id: "Privacy", label: p.sectionPrivacy, icon: Shield },
  { id: "Notifications", label: p.sectionNotifications, icon: Bell },
  { id: "Visibility", label: p.sectionVisibility, icon: Eye },
  { id: "Data", label: p.sectionData, icon: Database },
];

type NotifChannel = "email" | "push" | "inApp";
type NotifRow = { id: string; label: string; email: boolean; push: boolean; inApp: boolean };

const INITIAL_NOTIFS: NotifRow[] = [
  { id: "employer_view", label: "Employer viewed my profile", email: true, push: true, inApp: true },
  { id: "employer_saved", label: "Employer saved my profile", email: true, push: true, inApp: true },
  { id: "new_message", label: "New message received", email: true, push: true, inApp: true },
  { id: "slot_reminder", label: "Event slot reminder (1 h before)", email: true, push: true, inApp: false },
  { id: "feedback", label: "Employer left feedback", email: false, push: true, inApp: true },
  { id: "system", label: "System & policy updates", email: true, push: false, inApp: false },
];

function SettingRow({
  label,
  helper,
  checked,
  onCheckedChange,
}: {
  label: string;
  helper?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {helper && <p className="mt-0.5 text-xs text-ink-400">{helper}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} className="shrink-0" />
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("Account");

  // Privacy toggles
  const [offEvent, setOffEvent] = useState(false);
  const [searchResults, setSearchResults] = useState(true);
  const [research, setResearch] = useState(true);

  // Visibility
  const [paused, setPaused] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState<NotifRow[]>(INITIAL_NOTIFS);

  function toggleNotif(id: string, channel: NotifChannel) {
    setNotifs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [channel]: !r[channel] } : r)),
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-xl font-bold text-ink-900">{p.heading}</h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Sidebar nav */}
        <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-52 lg:flex-col lg:overflow-x-visible">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active === id
                  ? "bg-ink-900 text-surface-0"
                  : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
              {active === id && <ChevronRight className="ml-auto size-3.5 hidden lg:block" />}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* ── Account ── */}
          {active === "Account" && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{p.sectionAccount}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink-600">Email</label>
                    <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2">
                      <span className="flex-1 text-sm text-ink-700">{currentStudent.name.toLowerCase().replace(" ", ".")}@zjut.edu.cn</span>
                      <Badge variant="secondary" className="text-[10px]">Verified</Badge>
                    </div>
                    <p className="mt-1 text-xs text-ink-400">{p.emailNote}</p>
                  </div>

                  <Separator />

                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink-600">Phone number</label>
                    <input
                      type="tel"
                      placeholder="+86 xxx xxxx xxxx"
                      className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>

                  <Separator />

                  <div>
                    <p className="mb-2 text-sm font-medium text-ink-900">{p.passwordSection}</p>
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-ink-600">Display language</label>
                      <select className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400">
                        <option>English</option>
                        <option>中文 (简体)</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-ink-600">Timezone</label>
                      <select className="w-full rounded-lg border border-ink-200 bg-surface-0 px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400">
                        <option>Asia/Shanghai (UTC+8)</option>
                        <option>Asia/Bangkok (UTC+7)</option>
                        <option>Europe/London (UTC+0)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="primary" size="sm">{copy.pages.student.profile.saveSection}</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ── Privacy ── */}
          {active === "Privacy" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.sectionPrivacy}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-ink-100">
                  <SettingRow
                    label={p.offEventPrivacy}
                    checked={offEvent}
                    onCheckedChange={setOffEvent}
                  />
                  <SettingRow
                    label={p.searchResultsPrivacy}
                    checked={searchResults}
                    onCheckedChange={setSearchResults}
                  />
                  <SettingRow
                    label={p.researchPrivacy}
                    checked={research}
                    onCheckedChange={setResearch}
                  />
                </div>

                <Separator className="my-5" />

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    {p.downloadData}
                  </Button>
                  <div className="block sm:hidden" />
                  <Button variant="destructive" size="sm" className="w-full sm:ml-2 sm:w-auto">
                    {p.deleteAccount}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Notifications ── */}
          {active === "Notifications" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.sectionNotifications}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-ink-100 text-left">
                        <th className="pb-2 pr-4 text-xs font-medium text-ink-500">Notification</th>
                        <th className="pb-2 px-3 text-center text-xs font-medium text-ink-500">Email</th>
                        <th className="pb-2 px-3 text-center text-xs font-medium text-ink-500">Push</th>
                        <th className="pb-2 pl-3 text-center text-xs font-medium text-ink-500">In-app</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifs.map((row) => (
                        <tr key={row.id} className="border-b border-ink-50 last:border-0">
                          <td className="py-3 pr-4 text-sm text-ink-800">{row.label}</td>
                          {(["email", "push", "inApp"] as NotifChannel[]).map((ch) => (
                            <td key={ch} className="py-3 px-3 text-center">
                              <Switch
                                checked={row[ch]}
                                onCheckedChange={() => toggleNotif(row.id, ch)}
                                className="mx-auto"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Visibility ── */}
          {active === "Visibility" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.sectionVisibility}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3 rounded-lg border border-ink-200 px-4 py-3">
                  <span className={cn("size-2.5 rounded-full", paused ? "bg-ink-300" : "bg-success")} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-900">
                      {paused ? "Paused" : p.visibilityPublic}
                    </p>
                    <p className="text-xs text-ink-400">
                      {paused ? p.pauseHelper : "Verified employers can discover and view your profile."}
                    </p>
                  </div>
                </div>

                <SettingRow
                  label={p.pauseVisibility}
                  helper={p.pauseHelper}
                  checked={paused}
                  onCheckedChange={setPaused}
                />
              </CardContent>
            </Card>
          )}

          {/* ── Data & Export ── */}
          {active === "Data" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.sectionData}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium text-ink-900">What&apos;s included in your export</p>
                  <ul className="space-y-1">
                    {[
                      "Profile data (personal, academic, portfolio)",
                      "Event booking history",
                      "Employer interaction log",
                      "Messages (sent and received)",
                      "Feedback received from employers",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ink-600">
                        <span className="size-1.5 rounded-full bg-ink-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">{p.exportPDF}</Button>
                  <Button variant="outline" size="sm">{p.exportJSON}</Button>
                </div>

                <Separator />

                <p className="text-xs text-ink-400 leading-relaxed">{p.piplNote}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
