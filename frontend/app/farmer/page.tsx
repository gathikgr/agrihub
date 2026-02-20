"use client";

import { AppNav } from "@/components/nav";
import { PriceChart } from "@/components/price-chart";
import { AnimatedCard, Section } from "@/components/ui";
import { usePricePrediction, useStorageDecision } from "@/hooks/use-ai";
import { useWeather } from "@/hooks/use-weather";
import { useTranslation } from "react-i18next";

export default function FarmerDashboard() {
  const { t } = useTranslation();
  const { data: prediction } = usePricePrediction("Wheat");
  const { data: storage } = useStorageDecision({
    crop: "Wheat",
    quantity_tons: 10,
    current_price: 2200,
    predicted_price: prediction?.predicted_price || 2500
  });
  const { data: weather } = useWeather("Hyderabad");

  return (
    <main className="gradient-bg min-h-screen p-6 md:p-10">
      <AppNav />
      <Section title={t("farmer.overview")}> 
        <div className="grid gap-4 md:grid-cols-4">
          <AnimatedCard title={t("farmer.cropStatus")} value={t("farmer.healthy")} />
          <AnimatedCard title={t("farmer.daysToHarvest")} value="18" />
          <AnimatedCard title={t("farmer.weather")} value={weather?.summary || "--"} />
          <AnimatedCard title={t("farmer.mandiPrice")} value={`₹ ${prediction?.current_price || 2200}/q`} />
        </div>
      </Section>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title={t("farmer.aiRecommendation")}>
            <AnimatedCard title={t("farmer.sellStore")} value={storage?.recommendation || t("common.loading")}>
              <p className="mt-2 text-slate-300">{storage?.rationale}</p>
            </AnimatedCard>
            <PriceChart data={prediction?.series || []} />
          </Section>
          <Section title={t("farmer.sellFlow")}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <input className="w-full rounded-lg bg-slate-800 p-2" placeholder={t("farmer.videoUpload")} type="file" />
            </div>
          </Section>
        </div>
        <div className="space-y-6">
          <AnimatedCard title={t("farmer.expenses")} value="₹ 42,500" />
          <AnimatedCard title={t("farmer.transporters")} value="12" />
          <AnimatedCard title={t("farmer.storageProviders")} value="8" />
          <AnimatedCard title={t("farmer.profitEstimate")} value={`₹ ${storage?.estimated_profit || 65000}`} />
        </div>
      </div>
    </main>
  );
}
