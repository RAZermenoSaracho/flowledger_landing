import { BrandLogo } from "../components/BrandLogo";

/** Page footer with the brand mark and copyright notice. */
export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <BrandLogo className="h-8 w-auto" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} FlowLedger. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
