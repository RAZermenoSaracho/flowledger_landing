import { CtaLink } from "../components/CtaLink";
import { appLinks } from "../constants/links";

/** Above-the-fold hero section introducing FlowLedger and its primary CTAs. */
export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full bg-mint px-3 py-1 text-xs font-semibold text-pine dark:bg-emerald-950 dark:text-emerald-200">
          Personal finance workspace
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink dark:text-slate-50 sm:text-5xl">
          One dashboard for everything you spend, owe, and share.
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
          FlowLedger aggregates, organizes, and helps you understand your financial activity — accounts,
          transactions, shared expenses, and debts, all in a single workspace.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink href={appLinks.register} className="w-full sm:w-auto">
            Get started
          </CtaLink>
          <CtaLink href={appLinks.login} variant="secondary" className="w-full sm:w-auto">
            Log in
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
