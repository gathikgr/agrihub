"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useRoleDashboard } from "@/hooks/use-dashboard";
import { formatINR } from "@/lib/format";
import { useTranslation } from "react-i18next";

type StorageData = { bookings: number; occupancy: number; revenue: number };

export default function StorageDashboard() {
  const { t } = useTranslation();
  const { data } = useRoleDashboard<StorageData>("storage");
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("storage.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("storage.bookings")} value={String(data?.bookings || 0)} />
          <AnimatedCard title={t("storage.occupancy")} value={`${data?.occupancy || 0}%`} />
          <AnimatedCard title={t("storage.revenue")} value={formatINR(data?.revenue || 0)} />
        </div>
      </Section>
    </main>
  );
}
