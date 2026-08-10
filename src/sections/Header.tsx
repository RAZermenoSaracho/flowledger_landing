import { BrandLogo } from "../components/BrandLogo";
import { CtaLink } from "../components/CtaLink";
import { appLinks } from "../constants/links";

/** Sticky top navigation bar with brand mark, section anchors, and auth CTAs. */
export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" aria-label="FlowLedger home">
          <BrandLogo className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a className="transition hover:text-pine dark:hover:text-emerald-300" href="#features">
            Features
          </a>
          <a className="transition hover:text-pine dark:hover:text-emerald-300" href="#security">
            Security
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <CtaLink href={appLinks.login} variant="secondary" className="px-4">
            Log in
          </CtaLink>
          <CtaLink href={appLinks.register} className="hidden px-4 sm:inline-flex">
            Get started
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
