"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import ProgressIndicator from "@/components/ui/progress-indicator";

export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

export interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the insole tier that fits your lifestyle.\nAll tiers are ocean-grown, 100% biodegradable, and personalised to your foot.",
}: PricingProps) {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#00e5ff", "#69f0ae", "#00bcd4", "#b2ebf2"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div
      className="w-full py-20 px-4"
      style={{ background: "#030f14", color: "#e0f7fa" }}
    >
      {/* Header */}
      <div className="text-center space-y-4 mb-14 max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
          Our Tiers
        </p>
        <h2
          className="text-4xl font-bold tracking-tight sm:text-5xl text-white"
          style={{ fontFamily: "Syne, Inter, sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-slate-400 text-lg whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <span className="text-slate-400 text-sm font-medium">Monthly</span>
        <Label>
          <Switch
            ref={switchRef as React.RefObject<HTMLButtonElement>}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-cyan-400 data-[state=unchecked]:bg-slate-700"
          />
        </Label>
        <span className="text-sm font-semibold text-white">
          Annual{" "}
          <span className="text-cyan-400">(Save 20%)</span>
        </span>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1 + 0.2,
            }}
            className={cn(
              "rounded-2xl p-6 flex flex-col relative",
              plan.isPopular
                ? "border-2"
                : "border border-white/10",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2 ? "z-0" : "z-10"
            )}
            style={{
              background: plan.isPopular
                ? "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(105,240,174,0.06))"
                : "rgba(255,255,255,0.03)",
              borderColor: plan.isPopular ? "#00e5ff" : undefined,
              boxShadow: plan.isPopular
                ? "0 0 60px -10px rgba(0,229,255,0.25)"
                : "none",
            }}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div
                className="absolute top-0 right-0 py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center gap-1"
                style={{
                  background: "linear-gradient(90deg, #00e5ff, #69f0ae)",
                }}
              >
                <Star className="h-3.5 w-3.5 text-slate-900 fill-current" />
                <span className="text-slate-900 text-xs font-bold">Popular</span>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              {/* Tier name */}
              <p className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-4">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-white">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                    willChange
                  />
                </span>
                {plan.period !== "one-time" && (
                  <span className="text-slate-400 text-sm pb-1">
                    / {plan.period}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-6">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr
                className="mb-6"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              />

              {/* CTA Button using ProgressIndicator */}
              <div className="w-full flex justify-center py-2">
                <ProgressIndicator
                  stepLabels={[
                    plan.buttonText,
                    "Confirm " + plan.name,
                    "Checkout & Subscribe"
                  ]}
                  onComplete={() => {
                    confetti({
                      particleCount: 100,
                      spread: 80,
                      origin: { y: 0.6 }
                    });
                    navigate(plan.href);
                  }}
                />
              </div>

              <p className="mt-4 text-xs text-slate-500 text-center">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
