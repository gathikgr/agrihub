"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useTranslation } from "react-i18next";

export function AppNav() {
  const { t } = useTranslation();
  const { selected, chooseLanguage } = useLanguage();

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
      <h1 className="text-2xl font-bold text-emerald-300">{t("app.title")}</h1>
      <nav className="flex gap-3 text-sm">
        <Link href="/farmer">{t("nav.farmer")}</Link>
        <Link href="/buyer">{t("nav.buyer")}</Link>
        <Link href="/transporter">{t("nav.transporter")}</Link>
        <Link href="/storage">{t("nav.storage")}</Link>
        <Link href="/admin">{t("nav.admin")}</Link>
      </nav>
      <select
        className="rounded-lg bg-slate-800 px-3 py-2"
        value={selected}
        onChange={(e) => chooseLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="te">తెలుగు</option>
      </select>
    </header>
  );
}
