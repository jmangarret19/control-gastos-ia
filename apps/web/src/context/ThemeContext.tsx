import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'midnight' | 'forest' | 'sunset' | 'ocean';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme') as Theme;
        return stored || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Clean up classes if switching from old system (optional but good practice)
        root.classList.remove('dark');

        // Set data-theme attribute
        root.setAttribute('data-theme', theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
