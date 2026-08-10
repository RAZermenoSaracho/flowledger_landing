import { BarChart3, HandCoins, Landmark, RefreshCw, Users, Wallet } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";

const features = [
  {
    icon: Wallet,
    title: "Personal finance management",
    description: "Track accounts, income, expenses, and transfers from one organized workspace."
  },
  {
    icon: Users,
    title: "Shared expenses",
    description: "Split costs with groups and settle balances without losing track of who owes what."
  },
  {
    icon: HandCoins,
    title: "Debt tracking",
    description: "Keep per-person debt balances up to date as shared expenses and payments happen."
  },
  {
    icon: Landmark,
    title: "Bank integrations",
    description: "Connect accounts through a provider integration to bring in balances and activity."
  },
  {
    icon: RefreshCw,
    title: "Automated transaction imports",
    description: "Imported transactions go through a review step before they become part of your ledger."
  },
  {
    icon: BarChart3,
    title: "Financial reporting",
    description: "See summary, category, and monthly cash-flow reports built from your real activity."
  }
] as const;

/** Feature grid summarizing FlowLedger's core capabilities. */
export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink dark:text-slate-50">
          Everything your money needs, in one place
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          FlowLedger brings the pieces of your financial life together instead of scattering them across
          apps and spreadsheets.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
