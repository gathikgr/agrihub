"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function StorageDashboard() {
  const { t } = useTranslation();
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("storage.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("storage.bookings")} value="28" />
          <AnimatedCard title={t("storage.occupancy")} value="81%" />
          <AnimatedCard title={t("storage.revenue")} value="₹ 3.8L" />
        </div>
      </Section>
    </main>
  );
}
