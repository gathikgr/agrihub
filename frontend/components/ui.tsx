"use client";

import { ReactNode } from "react";

export function AnimatedCard({ title, value, children }: { title: string; value?: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-emerald-900/20 transition hover:-translate-y-1 hover:border-emerald-400">
      <p className="text-sm text-slate-400">{title}</p>
      {value && <p className="mt-2 text-2xl font-semibold">{value}</p>}
      {children}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-teal-300">{title}</h2>
      {children}
    </section>
  );
}
