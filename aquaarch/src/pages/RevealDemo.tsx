import HeroScrollVideoReveal from "../components/ui/hero-scroll-video-pin-reveal";

export default function RevealDemo() {
  const customTags = [
    { text: "Sustainably Harvested Algae", background: "#00bcd4", color: "#030f14" },
    { text: "Biodegrades in 60 Days", background: "#69f0ae", color: "#030f14" },
    { text: "Zero Microplastics", background: "#00e5ff", color: "#030f14" },
    { text: "Custom Arch Support", background: "#b2ebf2", color: "#030f14" }
  ];

  return (
    <div
      className="min-h-screen w-full bg-[#0d0f0d] text-white overflow-x-hidden"
      style={{ backgroundColor: "#0d0f0d", color: "#ffffff", minHeight: "100vh", width: "100%" }}
    >
      <HeroScrollVideoReveal
        topText={
          <>
            Step onto the
            <br />
            future of Earth.
          </>
        }
        headingText={
          <>
            Zero Landfill. Zero Guilt.
            <br />
            100% Ocean Grown.
          </>
        }
        tags={customTags}
        subText="Experience our circular biopolymer footbed engineering. Every scroll reveals how our marine algae transforms into peak-performance footwear comfort."
        videoSrc="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
        bottomText={
          <>
            Engineered for
            <br />
            circular movement.
          </>
        }
      />
    </div>
  );
}
