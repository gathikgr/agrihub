"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const roles = ["farmer", "buyer", "transporter", "storage_provider", "admin"] as const;

export default function AuthPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [role, setRole] = useState<(typeof roles)[number]>("farmer");
  const [loading, setLoading] = useState(false);

  const signInDemo = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/demo-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });

    if (res.ok) {
      const route = role === "storage_provider" ? "/storage" : `/${role}`;
      router.push(route);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="text-2xl font-bold text-emerald-300">{t("auth.title")}</h1>
        <p className="mt-3 text-slate-300">{t("auth.stepper")}</p>

        <div className="mt-6 grid gap-3">
          <label htmlFor="role" className="text-sm text-slate-400">
            {t("auth.role")}
          </label>
          <select
            id="role"
            className="rounded-lg border border-slate-700 bg-slate-800 p-2"
            value={role}
            onChange={(e) => setRole(e.target.value as (typeof roles)[number])}
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {t(`roles.${item}`)}
              </option>
            ))}
          </select>
          <button
            className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
            disabled={loading}
            onClick={signInDemo}
          >
            {loading ? t("common.loading") : t("auth.demoLogin")}
          </button>
        </div>
      </div>
    </main>
  );
}
