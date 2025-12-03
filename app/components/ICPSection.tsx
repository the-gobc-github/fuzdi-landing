'use client';

import { useEffect, useRef, useState } from 'react';

export default function ICPSection() {
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
        <section ref={sectionRef} id="icp" className="min-h-screen flex items-center justify-center px-8 py-24 bg-black/20">
            <div className="max-w-7xl mx-auto w-full">
                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 min-h-[600px]">
                    {/* Left Column - Problèmes des créatifs pros avec l'IA */}
                    <div className={`bg-gradient-to-br from-pink-100/90 to-pink-50/90 backdrop-blur-sm rounded-3xl border border-pink-300/40 hover:border-orange-500/50 transition-all duration-1000 ease-out p-8 md:p-12 flex flex-col justify-between ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
                                Problèmes<br />
                                des créatifs<br />
                                pros avec l'IA
                            </h2>
                            <ul className="space-y-3 text-black/90 text-sm md:text-base">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Outils dispersés, contraignants et peu paramétrables.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Accès laborieux à des cartes graphiques performantes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Crédits limités, coûteux et rapidement gaspillés</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Reproductibilité, personnalisation et <span className="line-through">scalabilité</span> insuffisantes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Maturité technique inégale au sein des équipes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Modèles évoluant trop vite pour être suivis efficacement</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Comment Fuzdi répond */}
                    <div className={`bg-gradient-to-br from-pink-200/90 to-pink-100/90 backdrop-blur-sm rounded-3xl border border-pink-300/40 hover:border-orange-500/50 transition-all duration-1000 ease-out p-8 md:p-12 flex flex-col justify-between ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
                                Comment<br />
                                Fuzdi<br />
                                répond
                            </h2>
                            <ul className="space-y-3 text-black/90 text-sm md:text-base">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Une plateforme unique responsable (ComfyUI) pensée pour les professionnels, avec des réglages plus précises et des fonctionnalités plus riches qu'une plateforme grand public en ligne.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Un accès aux meilleurs modèles open-source en streaming pour limiter les temps d'augmenter les quotas sur nos GPUs ou les vôtres</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Tout les modèles par APIs disponibles en permanence au coût réel par génération. Fin les crédits et les limitations !</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Un catalogue de workflows structurés et personnalisables, conçus pour être reproductibles, adaptables et extensibles selon les besoins</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Des formations continues et des ressources pour monter en compétences, usages et bonnes pratiques pour déployer l'utilisation "tout en imaginant" et contrôler les résultats</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Une veille continue et des mises à jour <del>rapides</del> liées pour rester agiles sur l'évolution rapide des technologies</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
