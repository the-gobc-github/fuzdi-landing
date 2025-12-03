'use client';

import { useState } from 'react';

interface NavigationProps {
    headerLogoOpacity: number;
}

export default function Navigation({ headerLogoOpacity }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Show background when logo is visible (opacity > 0) or menu is open
    const showBackground = headerLogoOpacity > 0 || isMenuOpen;

    const navLinks = [
        { href: '#audit', label: 'Audit' },
        { href: '#formation', label: 'Formation' },
        { href: '#solution', label: 'Solution' },
        { href: '#generation', label: "Génération d'assets" },
        { href: '#apropos', label: 'À propos' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-40 animate-fade-in transition-all duration-300"
            style={{
                backgroundColor: showBackground ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.2)',
                backdropFilter: showBackground ? 'blur(10px)' : 'blur(4px)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-2 flex items-center justify-between">
                {/* Placeholder for header logo space - actual logo is the floating one */}
                <div
                    className="h-10 sm:h-12 lg:h-20"
                    style={{ width: '120px', opacity: headerLogoOpacity }}
                >
                    {/* Space reserved for floating logo */}
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-white/90 text-sm xl:text-base">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="hover:text-white transition-all duration-300 hover:scale-110 inline-block"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Menu Button */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 relative z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}
                    />
                    <span
                        className={`block w-5 sm:w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 top-0 bg-black/95 backdrop-blur-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                style={{ zIndex: 45 }}
            >
                <ul className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 text-white text-lg sm:text-xl px-4">
                    {navLinks.map((link, index) => (
                        <li key={link.href} 
                            className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <a
                                href={link.href}
                                className="hover:text-orange-400 transition-all duration-300 inline-block text-center"
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
