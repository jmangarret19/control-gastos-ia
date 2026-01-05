/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Revert to class strategy
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-fg)',
                    50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', // Keep fallbacks if needed
                },
                background: 'var(--bg-base)',
                card: 'var(--bg-card)',
                text: 'var(--text-base)',
                muted: 'var(--text-muted)',
                border: 'var(--border-color)',
            }
        },
    },
    plugins: [],
}
