'use client';

import { useEffect, useRef, useState } from 'react';

export default function AuditSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentSection = sectionRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.2 }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="audit" className="min-h-screen flex items-center justify-center px-8 py-24 bg-black/20">
            <div className="max-w-7xl mx-auto w-full">
                {/* Bento Grid Layout */}
                <div className="grid md:grid-cols-2 gap-6 min-h-[600px]">
                    {/* Left Column - Two Stacked Boxes */}
                    <div className="flex flex-col gap-6">
                        {/* Top Left Box - Audit */}
                        <div className={`bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-sm rounded-3xl border border-purple-300/20 hover:border-orange-500/50 transition-all duration-1000 ease-out p-8 md:p-10 flex flex-col justify-between flex-1 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-purple-200/20 rounded-2xl flex items-center justify-center mb-5 border border-purple-300/30">
                                    <svg className="w-7 h-7 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                                    Audit
                                </h3>
                            </div>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                Un audit initial permet d'évaluer vos processus, identifier et les besoins les plus définis de votre équipe. Cette étape établit le cadre le plus pertinent pour intégrer des outils IA dans votre structure, tout en maîtrisant vos dépenses.
                            </p>
                        </div>

                        {/* Bottom Left Box - Formation */}
                        <div className={`bg-gradient-to-br from-orange-900/40 to-red-950/40 backdrop-blur-sm rounded-3xl border border-orange-300/20 hover:border-orange-500/50 transition-all duration-1000 ease-out p-8 md:p-10 flex flex-col justify-between flex-1 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-orange-200/20 rounded-2xl flex items-center justify-center mb-5 border border-orange-300/30">
                                    <svg className="w-7 h-7 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                                    Formation
                                </h3>
                            </div>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                Des formations professionnelles ciblées assurent à prise de connaissance et l'autonomie des créatifs face aux évolutions IA de leurs métiers.
                                <br /><br />
                                Image, vidéo, son ou 3D : chaque module est conçu pour donner des équipes les compétences nécessaires à leurs besoins selon eux et le niveau technique de chacun.
                            </p>
                        </div>
                    </div>

                    {/* Right Large Box - Fuzdi Studio */}
                    <div className={`bg-gradient-to-br from-amber-900/40 to-orange-950/40 backdrop-blur-sm rounded-3xl border border-amber-300/20 hover:border-orange-500/50 transition-all duration-1000 ease-out p-8 md:p-12 flex flex-col justify-between ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`} style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-amber-200/20 rounded-2xl flex items-center justify-center mb-6 border border-amber-300/30">
                                <svg className="w-8 h-8 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
                                Fuzdi Studio
                            </h2>
                        </div>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            Fuzdi Studio est une plateforme qui donne accès aux quatre modèles IA génératifs les plus populaires openSourceen filmréalisé par ia et en ligne via une interface unique et facturée au coût par génération. Les modèles sont disponibles pour structure de workflows personnalisables pour couvrir chaque rôle créatif. L'ensemble fonctionne depuis n'importe quel ordinateur, sans contrainte matérielle, avec une puissance adaptée à chaque usage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
