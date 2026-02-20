"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("admin.title")}>
        <div className="grid gap-4 md:grid-cols-4">
          <AnimatedCard title={t("admin.userApprovals")} value="9" />
          <AnimatedCard title={t("admin.listingApprovals")} value="14" />
          <AnimatedCard title={t("admin.transactions")} value="₹ 22.1L" />
          <AnimatedCard title={t("admin.aiOutputs")} value="127" />
        </div>
      </Section>
    </main>
  );
}
