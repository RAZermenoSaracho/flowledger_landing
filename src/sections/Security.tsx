import { KeyRound, ShieldCheck, Webhook } from "lucide-react";

const principles = [
  {
    icon: KeyRound,
    title: "Your bank credentials stay with your bank",
    description: "FlowLedger never stores bank usernames, passwords, OTPs, or card numbers."
  },
  {
    icon: ShieldCheck,
    title: "Passwords are always hashed",
    description: "Account credentials are hashed at rest, never stored or logged in plain text."
  },
  {
    icon: Webhook,
    title: "Verified provider webhooks",
    description: "Incoming bank-provider events are signature-verified before they're processed."
  }
] as const;

/** Section highlighting FlowLedger's security principles for prospective users. */
export function Security() {
  return (
    <section id="security" className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink dark:text-slate-50">
            Built with security first
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            FlowLedger prioritizes security over convenience when handling your financial data.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-md bg-mint text-pine dark:bg-emerald-900 dark:text-emerald-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink dark:text-slate-50">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
