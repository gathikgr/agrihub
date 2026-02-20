"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useRoleDashboard } from "@/hooks/use-dashboard";
import { formatINR } from "@/lib/format";
import { useTranslation } from "react-i18next";

type AdminData = { userApprovals: number; listingApprovals: number; transactions: number; aiOutputs: number };

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data } = useRoleDashboard<AdminData>("admin");
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("admin.title")}>
        <div className="grid gap-4 md:grid-cols-4">
          <AnimatedCard title={t("admin.userApprovals")} value={String(data?.userApprovals || 0)} />
          <AnimatedCard title={t("admin.listingApprovals")} value={String(data?.listingApprovals || 0)} />
          <AnimatedCard title={t("admin.transactions")} value={formatINR(data?.transactions || 0)} />
          <AnimatedCard title={t("admin.aiOutputs")} value={String(data?.aiOutputs || 0)} />
        </div>
      </Section>
    </main>
  );
}
