/**
 * Slide up/down
 * Code from https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
 * @param target 
 * @param duration 
 */
let slideUp = (target: HTMLElement, duration = 500) => {
    target.classList.add('transiting');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    ///target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    window.setTimeout(() => {
        target.classList.remove('show')
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('transiting');
    }, duration);
}

let slideDown = (target: HTMLElement, duration = 500) => {
    target.classList.add('transiting');
    target.style.removeProperty('display');

    target.classList.add('show');

    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    ///target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('transiting');
    }, duration);
}

let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

export default function () {
    const toggleMenu = document.getElementById('toggle-menu');
    if (toggleMenu) {
        toggleMenu.addEventListener('click', () => {
            if (document.getElementById('main-menu').classList.contains('transiting')) return;
            document.body.classList.toggle('show-menu');
            slideToggle(document.getElementById('main-menu'), 300);
            toggleMenu.classList.toggle('is-active');
        });
    }

    // Mobile topbar menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    
    const toggleMobileMenu = () => {
        if (mobileMenuContainer.classList.contains('transiting')) return;
        document.body.classList.toggle('show-menu');
        slideToggle(mobileMenuContainer, 300);
        
        // Toggle menu button
        if (mobileMenuToggle) mobileMenuToggle.classList.toggle('is-active');
        
        // Toggle overlay with animation
        if (mobileMenuOverlay) {
            if (document.body.classList.contains('show-menu')) {
                mobileMenuOverlay.style.display = 'block';
                mobileMenuOverlay.style.height = '100vh';
                setTimeout(() => mobileMenuOverlay.classList.add('show'), 10);
            } else {
                mobileMenuOverlay.classList.remove('show');
                setTimeout(() => {
                    mobileMenuOverlay.style.display = 'none';
                    mobileMenuOverlay.style.height = 'auto';
                }, 300);
            }
        }
    };
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            if (mobileMenuContainer.classList.contains('transiting')) return;
            document.body.classList.remove('show-menu');
            slideToggle(mobileMenuContainer, 300);
            
            // Remove active state from menu button
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('is-active');
            
            // Hide overlay with animation
            mobileMenuOverlay.classList.remove('show');
            setTimeout(() => {
                mobileMenuOverlay.style.display = 'none';
                mobileMenuOverlay.style.height = 'auto';
            }, 300);
        });
    }

    // Mobile scroll-based topbar switching
    const mobileLeftSidebar = document.getElementById('mobile-left-sidebar');
    const mobileTopbar = document.getElementById('mobile-topbar');
    
    if (mobileLeftSidebar && mobileTopbar) {
        let lastScrollTop = 0;
        let animationFrameId: number | null = null;
        const scrollThreshold = 150; // Total distance for full transition
        const transitionRange = 100; // Range over which transition happens
        
        const updateTopbarState = (scrollTop: number) => {
            // Calculate progress (0 to 1) based on scroll position
            const progress = Math.max(0, Math.min(1, (scrollTop - 50) / transitionRange));
            
            // Apply transforms based on progress
            if (mobileLeftSidebar) {
                const translateY = -100 * progress;
                const opacity = 1 - progress;
                mobileLeftSidebar.style.transform = `translateY(${translateY}%)`;
                mobileLeftSidebar.style.opacity = opacity.toString();
            }
            
            if (mobileTopbar) {
                const translateY = -100 * (1 - progress);
                const opacity = progress;
                mobileTopbar.style.transform = `translateY(${translateY}%)`;
                mobileTopbar.style.opacity = opacity.toString();
            }
        };
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Cancel previous animation frame
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            
            // Schedule update for next frame
            animationFrameId = requestAnimationFrame(() => {
                updateTopbarState(scrollTop);
            });
            
            lastScrollTop = scrollTop;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial state
        updateTopbarState(0);
    }
}