'use client';

import AnimatedLogo from './AnimatedLogo';

interface HeroSectionProps {
    heroLogoSize: number;
    onLogoRefSet: (ref: HTMLDivElement | null) => void;
    onInitialPosSet: (pos: { top: number; left: number }) => void;
}

export default function HeroSection({ heroLogoSize, onLogoRefSet, onInitialPosSet }: HeroSectionProps) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-light text-white leading-tight mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                    <span className="text-xl sm:text-3xl md:text-4xl lg:text-6xl block">
                        L'IA redéfinit les métiers de l'image.
                    </span>
                    <span className="flex flex-col md:flex-row items-center md:items-end lg:items-end lg:mb-4  justify-center">
                        <AnimatedLogo
                            heroLogoSize={heroLogoSize}
                            onLogoRefSet={onLogoRefSet}
                            onInitialPosSet={onInitialPosSet}
                        />
                        <span className="text-md sm:text-2xl md:text-4xl lg:text-4xl lg:mr-24 mb-1">
                            vous donne les outils pour en
                        </span>
                    </span>
                    <span className="text-md sm:text-2xl md:text-4xl lg:text-4xl block">
                        prendre le contrôle.
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-2" style={{ animationDelay: '0.5s', opacity: 0 }}>
                    Une solution complete pour intégrer lA dans votre production visuelle: audit, formation et plateforme cloud de génération

                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
                    <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300 min-w-[180px]">
                        Demander un audit
                    </button>
                    <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 min-w-[180px]">
                        Se former
                    </button>
                    <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 min-w-[180px]">
                        Particper a la beta Fuzdi studio
                    </button>
                </div>
            </div>
        </main>
    );
}
