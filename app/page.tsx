'use client';

import Navigation from './components/Navigation';
import FloatingLogo from './components/FloatingLogo';
import HeroSection from './components/HeroSection';
import ServiceSection from './components/ServiceSection';
import ICPSection from './components/ICPSection';
import { useLogoAnimation } from './hooks/useLogoAnimation';

export default function Home() {
  const {
    currentTop,
    currentLeft,
    logoSize,
    progress,
    headerLogoOpacity,
    heroLogoOpacity,
    heroLogoSize,
    isReady,
    setLogoInitialPos,
  } = useLogoAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#4a0a0a] to-[#8B4513] animate-gradient">
      <Navigation headerLogoOpacity={headerLogoOpacity} />

      <FloatingLogo
        currentTop={currentTop}
        currentLeft={currentLeft}
        heroLogoOpacity={heroLogoOpacity}
        logoSize={logoSize}
        progress={progress}
        isReady={isReady}
      />

      <HeroSection
        heroLogoSize={heroLogoSize}
        onLogoRefSet={() => { }}
        onInitialPosSet={setLogoInitialPos}
      />

      <ServiceSection />
      <ICPSection />
    </div>
  );
}