import type { LucideIcon } from "lucide-react";

/** Props accepted by {@link FeatureCard}. */
type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Card summarizing a single FlowLedger feature with an icon, title, and description. */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="grid h-11 w-11 place-items-center rounded-md bg-mint text-pine dark:bg-emerald-950 dark:text-emerald-200">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink dark:text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
