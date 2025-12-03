import { useEffect, useState, useCallback } from 'react';

interface LogoPosition {
    top: number;
    left: number;
}

interface ResponsiveSizes {
    hero: number;
    header: number;
}

interface AnimationState {
    currentTop: number;
    currentLeft: number;
    logoSize: number;
    progress: number;
    headerLogoOpacity: number;
    heroLogoOpacity: number;
    heroLogoSize: number;
    setLogoInitialPos: (pos: LogoPosition) => void;
}

// Smooth easing function for natural movement
const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// Get responsive logo sizes based on screen width
const getResponsiveSizes = (windowWidth: number): ResponsiveSizes => {
    if (windowWidth < 768) { // Mobile
        return { hero: 200, header: 100 };
    } else if (windowWidth < 1024) { // Tablet
        return { hero: 240, header: 120 };
    } else { // Desktop
        return { hero: 260, header: 140 };
    }
};

// Get header position based on screen width
const getHeaderPosition = (windowWidth: number): LogoPosition => {
    if (windowWidth < 640) { // Mobile
        return { top: 16, left: 16 };
    } else if (windowWidth < 1024) { // Tablet
        return { top: 20, left: 24 };
    } else { // Desktop
        return { top: 18, left: 32 };
    }
};

export function useLogoAnimation(): AnimationState {
    const [scrollY, setScrollY] = useState(0);
    const [logoInitialPos, setLogoInitialPos] = useState<LogoPosition>({ top: -20, left: -100 });
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // Set initial width
        setWindowWidth(window.innerWidth);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calculate animation progress
    const maxScroll = 600; // Longer distance for smoother transition
    const progress = Math.min(scrollY / maxScroll, 1);
    const smoothProgress = easeInOutCubic(progress);

    // Get responsive sizes
    const { hero: heroLogoSize, header: headerLogoSize } = getResponsiveSizes(windowWidth);
    const logoSize = heroLogoSize - ((heroLogoSize - headerLogoSize) * smoothProgress);

    // Get header position
    const { top: headerTop, left: headerLeft } = getHeaderPosition(windowWidth);

    // Calculate position - move both vertically and horizontally to align with header logo
    // Once animation is complete (progress = 1), keep logo fixed at header position
    const animatedTop = logoInitialPos.top - (logoInitialPos.top - headerTop) * smoothProgress - scrollY;
    const currentTop = progress >= 1 ? headerTop : Math.max(animatedTop, headerTop);

    // Move from center position to header left position (vertically aligned with header logo)
    const leftOffset = windowWidth >= 768 ? 25 : 0; // Only add offset on tablet/desktop
    const startLeft = logoInitialPos.left - (heroLogoSize / 2) + leftOffset;
    const currentLeft = progress >= 1 ? headerLeft : startLeft - (startLeft - headerLeft) * smoothProgress;

    // Single logo - always visible, no fading
    const headerLogoOpacity = 0; // Hide header logo completely, we use the floating one
    const heroLogoOpacity = 1; // Keep floating logo always visible

    const handleSetLogoInitialPos = useCallback((pos: LogoPosition) => {
        setLogoInitialPos(pos);
    }, []);

    return {
        currentTop,
        currentLeft,
        logoSize,
        progress,
        headerLogoOpacity,
        heroLogoOpacity,
        heroLogoSize,
        setLogoInitialPos: handleSetLogoInitialPos,
    };
}
