"use client";

import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function BuyerDashboard() {
  const { t } = useTranslation();
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("buyer.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("buyer.approvedListings")} value="26" />
          <AnimatedCard title={t("buyer.activeOrders")} value="5" />
          <AnimatedCard title={t("buyer.orderHistory")} value="41" />
        </div>
      </Section>
    </main>
  );
}
