import { CallToAction } from "./sections/CallToAction";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Security } from "./sections/Security";

/** Root component composing the FlowLedger landing page sections. */
export function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
