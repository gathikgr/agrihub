"use client";
import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function TransporterDashboard() {
  const { t } = useTranslation();
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("transporter.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("transporter.requests")} value="17" />
          <AnimatedCard title={t("transporter.capacity")} value="74%" />
          <AnimatedCard title={t("transporter.deliveries")} value="93" />
        </div>
      </Section>
    </main>
  );
}
