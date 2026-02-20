"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useRoleDashboard } from "@/hooks/use-dashboard";
import { useTranslation } from "react-i18next";

type TransportData = { requests: number; capacity: number; deliveries: number };

export default function TransporterDashboard() {
  const { t } = useTranslation();
  const { data } = useRoleDashboard<TransportData>("transporter");
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("transporter.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("transporter.requests")} value={String(data?.requests || 0)} />
          <AnimatedCard title={t("transporter.capacity")} value={`${data?.capacity || 0}%`} />
          <AnimatedCard title={t("transporter.deliveries")} value={String(data?.deliveries || 0)} />
        </div>
      </Section>
    </main>
  );
}
