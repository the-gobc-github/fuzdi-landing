'use client';

import { useEffect, useRef, useState } from 'react';

export default function ICPSection() {
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
            // Progress goes from 0 when section starts entering viewport to 1 when fully visible
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
    const leftColumnOpacity = scrollProgress;
    const leftColumnTranslateY = (1 - scrollProgress) * (isMobile ? 100 : 200);

    const rightColumnOpacity = Math.max(0, (scrollProgress - 0.2) * 1.25); // Starts later
    const rightColumnTranslateY = (1 - Math.max(0, (scrollProgress - 0.2) * 1.25)) * (isMobile ? 100 : 200);

    return (
        <section ref={sectionRef} id="icp" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto w-full">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                    {/* Left Column - Problèmes des créatifs pros avec l'IA */}
                    <div
                        className="bg-white/10 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] border border-white/20 p-6 sm:p-8 lg:p-12 flex flex-col justify-between shadow-2xl hover:bg-white/15 transition-colors duration-500"
                        style={{
                            opacity: leftColumnOpacity,
                            transform: `translateY(${leftColumnTranslateY}px)`,
                            transition: 'none'
                        }}
                    >
                        <div>
                            {/* Icon */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-red-300/30">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 sm:mb-10 lg:mb-12 leading-tight">
                                Les défis<br />
                                <span className="text-white/70">des créatifs</span>
                            </h2>

                            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Outils dispersés et contraignants</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Accès limité aux GPU performants</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Crédits coûteux et limités</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Reproductibilité insuffisante</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Évolution technologique trop rapide</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Comment Fuzdi répond */}
                    <div
                        className="bg-white/10 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] border border-white/20 p-6 sm:p-8 lg:p-12 flex flex-col justify-between shadow-2xl hover:bg-white/15 transition-colors duration-500"
                        style={{
                            opacity: rightColumnOpacity,
                            transform: `translateY(${rightColumnTranslateY}px)`,
                            transition: 'none'
                        }}
                    >
                        <div>
                            {/* Icon */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-green-300/30">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 sm:mb-10 lg:mb-12 leading-tight">
                                Notre<br />
                                <span className="text-white/70">solution</span>
                            </h2>

                            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Plateforme unique et professionnelle</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Accès GPU en streaming performant</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Facturation au coût réel</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Workflows reproductibles</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Formation continue</p>
                                </div>
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">Veille technologique</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
