"use client";
import { useEffect } from 'react';

export const usePreventScroll = (isOpen) => {
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';

            // Optional: Prevent scrolling on mobile
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            // Re-enable scrolling
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';

            // Restore scroll position
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [isOpen]);
};