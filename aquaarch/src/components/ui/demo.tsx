'use client';

import React from 'react';
import HeroScrollVideoReveal from './hero-scroll-video-pin-reveal';

export default function HeroScrollVideoRevealDemo() {
  return (
    <div
      className="min-h-screen w-full bg-[#0d0f0d] text-white overflow-x-hidden"
      style={{ backgroundColor: '#0d0f0d', color: '#ffffff', minHeight: '100vh', width: '100%' }}
    >
      <HeroScrollVideoReveal
        videoSrc="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
      />
    </div>
  );
}
