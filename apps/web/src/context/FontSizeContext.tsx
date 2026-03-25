import React, { createContext, useContext, useEffect, useState } from 'react';

export type FontSize = 'small10' | 'small' | 'medium' | 'large';

interface FontSizeContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | null>(null);

const FONT_SIZES: Record<FontSize, string> = {
    small10: '10px',
    small: '14px',
    medium: '16px',
    large: '18px',
};

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontSize, setFontSizeState] = useState<FontSize>(() => {
        const stored = localStorage.getItem('ui-font-size') as FontSize;
        return stored || 'medium';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Apply font size scale globally.
        // Tailwind relies heavily on rem units, so scaling the document root 
        // will naturally scale typography, margins, paddings, etc.
        root.style.fontSize = FONT_SIZES[fontSize];

        localStorage.setItem('ui-font-size', fontSize);
    }, [fontSize]);

    const setFontSize = (newSize: FontSize) => {
        setFontSizeState(newSize);
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    const context = useContext(FontSizeContext);
    if (!context) throw new Error('useFontSize must be used within FontSizeProvider');
    return context;
};
