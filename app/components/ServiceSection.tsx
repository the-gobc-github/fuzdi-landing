'use client';

import { useEffect, useRef, useState } from 'react';

export default function ServiceSection() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the section is visible
            const sectionTop = rect.top;
            const sectionHeight = rect.height;

            // Start animation when section is 20% visible, complete when 80% visible
            const startPoint = windowHeight - (sectionHeight * 0.2);
            const endPoint = windowHeight - (sectionHeight * 0.8);

            let progress = 0;
            if (sectionTop <= startPoint) {
                progress = Math.min(1, (startPoint - sectionTop) / (startPoint - endPoint));
            }

            setScrollProgress(Math.max(0, Math.min(1, progress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Interpolate animations based on scroll progress
    const leftBoxesOpacity = scrollProgress;
    const leftBoxesTranslateX = (1 - scrollProgress) * (isMobile ? -150 : -300);

    const rightBoxOpacity = Math.max(0, (scrollProgress - 0.3) * 1.43); // Starts later
    const rightBoxTranslateX = (1 - Math.max(0, (scrollProgress - 0.3) * 1.43)) * (isMobile ? 150 : 300);

    return (
        <section ref={sectionRef} id="audit" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto w-full">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                    {/* Left Column - Two Stacked Boxes */}
                    <div className="flex flex-col gap-6 sm:gap-8">
                        {/* Top Left Box - Audit */}
                        <div
                            className="bg-white/8 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] border border-white/20 p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 shadow-2xl hover:bg-white/12 transition-colors duration-500"
                            style={{
                                opacity: leftBoxesOpacity,
                                transform: `translateX(${leftBoxesTranslateX}px)`,
                                transition: 'none'
                            }}
                        >
                            <div>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-blue-300/30">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6">
                                    Audit
                                </h3>
                                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                                    Évaluation complète de vos processus créatifs pour une intégration IA optimale et maîtrisée.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Left Box - Formation */}
                        <div
                            className="bg-white/8 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] border border-white/20 p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 shadow-2xl hover:bg-white/12 transition-colors duration-500"
                            style={{
                                opacity: leftBoxesOpacity,
                                transform: `translateX(${leftBoxesTranslateX}px)`,
                                transition: 'none'
                            }}
                        >
                            <div>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-purple-300/30">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6">
                                    Formation
                                </h3>
                                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                                    Programmes spécialisés pour maîtriser les outils IA selon votre métier créatif.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Large Box - Fuzdi Studio */}
                    <div
                        className="bg-white/8 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] border border-white/20 p-6 sm:p-8 lg:p-12 flex flex-col justify-between shadow-2xl hover:bg-white/12 transition-colors duration-500"
                        style={{
                            opacity: rightBoxOpacity,
                            transform: `translateX(${rightBoxTranslateX}px)`,
                            transition: 'none'
                        }}
                    >
                        <div>
                            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-orange-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-orange-300/30">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 sm:mb-8 tracking-wide">
                                Fuzdi Studio
                            </h2>
                            <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                                Plateforme cloud unifiée donnant accès aux meilleurs modèles IA génératifs via des workflows personnalisables pour chaque métier créatif.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
