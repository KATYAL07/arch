'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface TagItem {
  id?: string;
  text: string;
  background: string;
  color?: string;
}

export interface HeroScrollVideoRevealProps {
  topText?: React.ReactNode;
  headingText?: React.ReactNode;
  tags?: TagItem[];
  subText?: string;
  videoSrc?: string;
  bottomText?: React.ReactNode;
  badgeImgSrc?: string;
  className?: string;
}

const DEFAULT_TAGS: TagItem[] = [
  { text: 'Quiet peaks', background: '#1B211A', color: '#ffffff' },
  { text: 'Pure air energy', background: '#628141', color: '#ffffff' },
  { text: 'Endlessly renewable', background: '#EBD5AB', color: '#444444' },
  { text: 'Clean as alpine snow', background: '#2F5755', color: '#ffffff' },
];

export const HeroScrollVideoReveal: React.FC<HeroScrollVideoRevealProps> = ({
  topText = (
    <>
      Built to flow with your story,
      <br />
      not fight it
    </>
  ),
  headingText = (
    <>
      Step into mountain calm <br />
      Nature tells the story.
    </>
  ),
  tags = DEFAULT_TAGS,
  subText = 'And the journey continues beyond the summit...',
  videoSrc = 'https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4',
  bottomText = (
    <>
      Where every scroll feels
      <br />
      intentional
    </>
  ),
  badgeImgSrc: _badgeImgSrc = 'https://i.ibb.co/kgFKP37B/rotate-text.png',
  className = '',
}) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    let split: any = null;
    let words: Element[] = [];
    try {
      split = new SplitText(paraRef.current, {
        type: 'words',
        wordsClass: 'reveal-word inline-block origin-left mr-[0.25em] will-change-transform',
      });
      words = split.words;
    } catch {
      if (paraRef.current) {
        words = Array.from(paraRef.current.querySelectorAll('.reveal-word'));
      }
    }
    if (words && words.length > 0) {
      gsap.set(words, { opacity: 0, rotate: 8, yPercent: 30 });
    }

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitRef.current,
        start: 'top 70%',
        end: 'top -10%',
        scrub: 1.5,
      },
    });

    if (words && words.length > 0) {
      revealTl.to(words, {
        stagger: 0.2,
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        ease: 'power1.inOut',
      });
    }

    tagRefs.current.forEach((tagEl) => {
      if (tagEl) {
        revealTl.to(
          tagEl,
          {
            duration: 1,
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'circ.out',
          },
          '>-0.4'
        );
      }
    });

    const mm = gsap.matchMedia();

    mm.add('(max-width: 639.9px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(18% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(18% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    mm.add('(min-width: 640px) and (max-width: 1023.9px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(12% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1.3,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(12% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    mm.add('(min-width: 1024px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(8% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self: any) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(8% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    return () => {
      if (split && split.revert) split.revert();
      revealTl.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen bg-[#0d0f0d] text-[#f3f4f6] font-sans overflow-x-hidden ${className}`}
      style={{ backgroundColor: '#0d0f0d', color: '#f3f4f6' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pin-spacer { background-color: #0d0f0d !important; }
            body, html { background-color: #0d0f0d !important; }
          `,
        }}
      />
      {/* Section 1: Intro Text */}
      <section
        className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold tracking-tight leading-tight text-white relative z-10 bg-[#0d0f0d]"
        style={{ backgroundColor: '#0d0f0d' }}
      >
        {topText}
      </section>
      {/* Section 2: Benefit & Headline Section */}
      <section
        ref={benefitRef}
        className="relative w-full min-h-[140vh] md:min-h-[160vh] pb-16 md:pb-20 bg-[#0d0f0d]"
        style={{ backgroundColor: '#0d0f0d' }}
      >
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center text-center relative z-10 bg-[#0d0f0d]"
          style={{ backgroundColor: '#0d0f0d' }}
        >
          <div className="w-full mb-8 sm:mb-12 md:mb-14">
            <p
              ref={paraRef}
              className="text-[clamp(2rem,5vw,5rem)] font-extrabold tracking-tight leading-tight text-white overflow-visible"
            >
              {headingText}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto my-4 sm:my-6 mb-8 sm:mb-14">
            {tags.map((tag, idx) => (
              <div
                key={tag.id || `tag-${idx}`}
                ref={(el) => {
                  tagRefs.current[idx] = el;
                }}
                className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-[clamp(0.95rem,2vw,1.8rem)] font-semibold tracking-tight opacity-0 shadow-2xl will-change-[clip-path,opacity]"
                style={{
                  backgroundColor: tag.background,
                  color: tag.color || '#ffffff',
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                }}
              >
                {tag.text}
              </div>
            ))}
          </div>
          {subText && (
            <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] text-zinc-400 font-normal max-w-xl mt-2 sm:mt-4 px-4">
              {subText}
            </p>
          )}
        </div>
        {/* Video Pin Section */}
        <div className="relative w-full bg-[#0d0f0d]" style={{ backgroundColor: '#0d0f0d' }}>
          <div
            ref={videoWrapperRef}
            className="w-full h-screen flex justify-center items-center relative overflow-hidden bg-[#0d0f0d]"
            style={{ backgroundColor: '#0d0f0d' }}
          >
            <div
              className="absolute inset-0 w-full h-full pointer-events-none bg-[#0d0f0d]"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#0d0f0d',
                zIndex: 1,
              }}
            />
            <div
              ref={videoBoxRef}
              className="relative w-full h-full overflow-hidden flex justify-center items-center bg-[#0d0f0d] will-change-[clip-path]"
              style={{ backgroundColor: '#0d0f0d', zIndex: 2 }}
            >
              {/* Green glowing border overlay that matches the clipPath boundary at rest */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#69f0ae]/35 pointer-events-none z-10 w-[36%] h-[36%] sm:w-[24%] sm:h-[24%] lg:w-[16%] lg:h-[16%] transition-all duration-300"
                style={{
                  boxShadow: '0 0 50px rgba(105, 240, 174, 0.35)',
                  background: 'radial-gradient(circle, rgba(105, 240, 174, 0.12) 0%, transparent 70%)',
                }}
              />

              {/* Dynamic SVG rotating text badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 z-20 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  <path id="badgeCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[6.5px] font-bold uppercase fill-[#69f0ae] tracking-[3px]" style={{ fontFamily: 'Syne, Inter, sans-serif' }}>
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      AquaArch • Sustainable Footwear •
                    </textPath>
                  </text>
                </svg>
              </div>

              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="w-full h-full object-cover bg-[#0d0f0d]"
                style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#0d0f0d' }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              {/* Central disk with official AquaArch circular logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#69f0ae]/60 shadow-[0_0_30px_rgba(39,71,53,0.9)] flex justify-center items-center bg-[#274735]">
                  <img
                    src="/aquaarch-logo.jpg"
                    alt="AquaArch Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 3: Bottom Outro Text */}
      <section
        className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold tracking-tight leading-tight text-white relative z-10 bg-[#0d0f0d]"
        style={{ backgroundColor: '#0d0f0d' }}
      >
        {bottomText}
      </section>
    </div>
  );
};

export default HeroScrollVideoReveal;
