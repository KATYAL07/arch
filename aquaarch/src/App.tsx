import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import Capture from "./pages/Capture";
import PricingDemo from "./pages/PricingDemo";
import RevealDemo from "./pages/RevealDemo";
import ProgressDemoPage from "./pages/ProgressDemoPage";
import Header from "./components/Header";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis global smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    } as any);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/pricing-demo" element={<PricingDemo />} />
            <Route path="/progress-demo" element={<ProgressDemoPage />} />
            <Route path="/experience" element={<RevealDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
