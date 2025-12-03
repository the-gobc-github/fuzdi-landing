'use client';

import { useEffect, useRef } from 'react';

interface AnimatedLogoProps {
    heroLogoSize: number;
    onLogoRefSet: (ref: HTMLDivElement | null) => void;
    onInitialPosSet: (pos: { top: number; left: number }) => void;
}

export default function AnimatedLogo({ heroLogoSize, onLogoRefSet, onInitialPosSet }: AnimatedLogoProps) {
    const logoRef = useRef<HTMLDivElement>(null);
    const onInitialPosSetRef = useRef(onInitialPosSet);
    const onLogoRefSetRef = useRef(onLogoRefSet);

    // Keep refs updated
    useEffect(() => {
        onInitialPosSetRef.current = onInitialPosSet;
        onLogoRefSetRef.current = onLogoRefSet;
    });

    useEffect(() => {
        const updatePosition = () => {
            if (logoRef.current) {
                const rect = logoRef.current.getBoundingClientRect();
                onInitialPosSetRef.current({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX + (rect.width / 2) // Center position
                });
            }
        };

        // Initial position calculation
        updatePosition();
        onLogoRefSetRef.current(logoRef.current);

        // Recalculate on window resize
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []); // Empty dependency array - only run once on mount

    return (
        <span
            ref={logoRef}
            className="inline-block align-middle"
            style={{ width: `${heroLogoSize}px`, height: `${heroLogoSize * 0.35}px` }}
            aria-label="Fuzdi"
        />
    );
}
