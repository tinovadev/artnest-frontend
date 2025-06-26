import React from "react";

import { Shield, Upload, Sparkle, Lightning } from "phosphor-react";

const features = [
  {
    icon: Shield,
    title: "AI Protection",
    description:
      "Advanced algorithms detect and prevent unauthorized AI training on your artwork.",
  },
  {
    icon: Sparkle,
    title: "New Opportunities",
    description:
      "Unlock new creative and financial opportunities through the AI resource market.",
  },
  {
    icon: Lightning,
    title: "Instant Protection",
    description:
      "Your work is protected immediately after upload with our real-time monitoring system.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-pixel text-4xl font-bold text-white sm:text-5xl">
            Comprehensive Art Protection
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Everything you need to safeguard your creative work in the digital
            age
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group transform rounded-2xl bg-muted p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-secondary hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
                <feature.icon className="h-8 w-8 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-orange-500">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
