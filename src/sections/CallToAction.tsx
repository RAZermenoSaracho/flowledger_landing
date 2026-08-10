import { CtaLink } from "../components/CtaLink";
import { appLinks } from "../constants/links";

/** Closing call-to-action band repeated near the end of the page. */
export function CallToAction() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-lg bg-ink px-6 py-14 text-center dark:bg-slate-900">
        <h2 className="text-3xl font-bold tracking-tight text-white">Ready to take control of your money?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Create your FlowLedger account and bring your accounts, expenses, and debts into one dashboard.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink href={appLinks.register} className="w-full sm:w-auto">
            Get started
          </CtaLink>
          <CtaLink href={appLinks.login} variant="outline" className="w-full sm:w-auto">
            Log in
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
