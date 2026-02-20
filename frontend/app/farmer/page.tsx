"use client";

import { AppNav } from "@/components/nav";
import { PriceChart } from "@/components/price-chart";
import { AnimatedCard, Section } from "@/components/ui";
import { usePricePrediction, useStorageDecision } from "@/hooks/use-ai";
import { useRoleDashboard } from "@/hooks/use-dashboard";
import { useMandiPrice } from "@/hooks/use-mandi";
import { useWeather } from "@/hooks/use-weather";
import { formatINR } from "@/lib/format";
import { useTranslation } from "react-i18next";

type FarmerData = {
  cropStatus: string;
  daysToHarvest: number;
  expenses: number;
  nearbyTransporters: number;
  nearbyStorage: number;
  chart: Array<{ day: string; price: number }>;
};

export default function FarmerDashboard() {
  const { t } = useTranslation();
  const { data: dashboard } = useRoleDashboard<FarmerData>("farmer");
  const { data: prediction } = usePricePrediction(t("crops.wheat"));
  const { data: storage } = useStorageDecision({
    crop: t("crops.wheat"),
    quantity_tons: 10,
    current_price: prediction?.current_price || 2200,
    predicted_price: prediction?.predicted_price || 2500
  });
  const { data: weather } = useWeather(t("locations.defaultCity"));
  const { data: mandi } = useMandiPrice();

  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("farmer.overview")}>
        <div className="grid gap-4 md:grid-cols-4">
          <AnimatedCard title={t("farmer.cropStatus")} value={t(`farmer.${dashboard?.cropStatus || "healthy"}`)} />
          <AnimatedCard title={t("farmer.daysToHarvest")} value={String(dashboard?.daysToHarvest || 0)} />
          <AnimatedCard title={t("farmer.weather")} value={weather?.summary || t("common.loading")} />
          <AnimatedCard
            title={t("farmer.mandiPrice")}
            value={`${formatINR(mandi?.price || prediction?.current_price || 0)}/q`}
          />
        </div>
      </Section>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title={t("farmer.aiRecommendation")}>
            <AnimatedCard title={t("farmer.sellStore")} value={storage?.recommendation || t("common.loading")}>
              <p className="mt-2 text-slate-300">{storage?.rationale}</p>
            </AnimatedCard>
            <PriceChart data={prediction?.series || dashboard?.chart || []} />
          </Section>
          <Section title={t("farmer.sellFlow")}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <label className="mb-2 block text-sm text-slate-300" htmlFor="quality-video">
                {t("farmer.videoUpload")}
              </label>
              <input id="quality-video" className="w-full rounded-lg bg-slate-800 p-2" type="file" />
            </div>
          </Section>
        </div>
        <div className="space-y-6">
          <AnimatedCard title={t("farmer.expenses")} value={formatINR(dashboard?.expenses || 0)} />
          <AnimatedCard title={t("farmer.transporters")} value={String(dashboard?.nearbyTransporters || 0)} />
          <AnimatedCard title={t("farmer.storageProviders")} value={String(dashboard?.nearbyStorage || 0)} />
          <AnimatedCard title={t("farmer.profitEstimate")} value={formatINR(storage?.estimated_profit || 0)} />
        </div>
      </div>
    </main>
  );
}
