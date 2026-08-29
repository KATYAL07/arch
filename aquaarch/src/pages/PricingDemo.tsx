import Pricing, { type PricingPlan } from "../components/ui/pricing";

export default function PricingDemo() {
  const plans: PricingPlan[] = [
    {
      name: "EcoSupport",
      price: "799",
      yearlyPrice: "639",
      period: "month",
      features: [
        "100% biodegradable PLA biopolymer",
        "Designed for daily sneaker wear",
        "Lightweight & breathable structure",
        "Standard footbed cushioning",
        "Carbon-neutral shipping"
      ],
      description: "Perfect for everyday wear, casual sneakers, and standard daily comfort.",
      buttonText: "Start EcoSupport",
      href: "/catalog",
      isPopular: false,
    },
    {
      name: "EcoDomes",
      price: "1199",
      yearlyPrice: "959",
      period: "month",
      features: [
        "High-durability PHB biopolymer",
        "Optimized for runners & active sports",
        "Advanced shock absorption layer",
        "Customizable arch inserts included",
        "Free biodegradable return pouch",
        "Priority shipping"
      ],
      description: "Ideal for long-distance runners, active athletes, and frequent outdoor use.",
      buttonText: "Start EcoDomes",
      href: "/catalog",
      isPopular: true,
    },
    {
      name: "EcoStrides",
      price: "2099",
      yearlyPrice: "1679",
      period: "month",
      features: [
        "Elite-grade PHA elastomer",
        "Maximum energy return & performance",
        "Dual-density custom orthotic zone",
        "Anti-microbial algae coating",
        "1-on-1 orthotic fit consultation",
        "Free lifetime recycling program"
      ],
      description: "Engineered for competitive athletes who demand maximum responsiveness and custom-molded support.",
      buttonText: "Start EcoStrides",
      href: "/catalog",
      isPopular: false,
    },
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-16 flex flex-col justify-between"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(0,121,107,0.2) 0%, rgba(0,96,100,0.1) 40%, transparent 70%), #030f14",
      }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(105,240,174,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10">
        <Pricing
          plans={plans}
          title="AquaArch Subscription Tiers"
          description={"Step into circular sustainability with fresh insoles delivered to your door.\nSwap and recycle your old insoles when they wear down."}
        />
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 max-w-lg mx-auto px-6 relative z-10">
        <p>
          Each subscription includes a prepaid bio-recycling mailer. When your new insoles arrive, send your old ones back to be composted into agricultural nutrients.
        </p>
      </div>
    </div>
  );
}
