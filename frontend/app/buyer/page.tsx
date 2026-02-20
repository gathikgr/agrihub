"use client";

import { AppNav } from "@/components/nav";
import { AnimatedCard, Section } from "@/components/ui";
import { useRoleDashboard } from "@/hooks/use-dashboard";
import { useTranslation } from "react-i18next";

type BuyerData = { approvedListings: number; activeOrders: number; orderHistory: number };

export default function BuyerDashboard() {
  const { t } = useTranslation();
  const { data } = useRoleDashboard<BuyerData>("buyer");
  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("buyer.title")}>
        <div className="grid gap-4 md:grid-cols-3">
          <AnimatedCard title={t("buyer.approvedListings")} value={String(data?.approvedListings || 0)} />
          <AnimatedCard title={t("buyer.activeOrders")} value={String(data?.activeOrders || 0)} />
          <AnimatedCard title={t("buyer.orderHistory")} value={String(data?.orderHistory || 0)} />
        </div>
      </Section>
    </main>
  );
}
