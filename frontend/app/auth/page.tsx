"use client";
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="text-2xl font-bold text-emerald-300">{t("auth.title")}</h1>
        <p className="mt-3 text-slate-300">{t("auth.stepper")}</p>
      </div>
    </main>
  );
}
