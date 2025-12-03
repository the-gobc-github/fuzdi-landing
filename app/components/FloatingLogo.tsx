'use client';

import Image from 'next/image';

interface FloatingLogoProps {
    currentTop: number;
    currentLeft: number;
    heroLogoOpacity: number;
    logoSize: number;
    progress: number;
    isReady: boolean;
}

export default function FloatingLogo({
    currentTop,
    currentLeft,
    heroLogoOpacity,
    logoSize,
    progress,
    isReady
}: FloatingLogoProps) {
    return (
        <div
            className="fixed z-50 transition-opacity duration-300"
            style={{
                top: `${currentTop}px`,
                left: `${currentLeft}px`,
                pointerEvents: 'auto',
                willChange: 'transform',
                opacity: isReady ? 1 : 0
            }}
        >
            <Image
                src="/images/fuzdi_orange.png"
                alt="Fuzdi Logo"
                width={200}
                height={144}
                priority
                style={{
                    width: `${logoSize}px`,
                    height: 'auto'
                }}
            />
        </div>
    );
}
