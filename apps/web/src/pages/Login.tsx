import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token, response.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-[var(--bg-base)] text-[var(--text-base)]">
            <div className="absolute top-4 right-4 flex gap-4">
                <select
                    onChange={(e) => {
                        // Cast string to Theme type safely
                        const val = e.target.value as any;
                        setTheme(val);
                    }}
                    value={theme}
                    className="px-3 py-1 rounded bg-[var(--bg-card)] text-[var(--text-base)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary)]"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="midnight">Midnight</option>
                    <option value="forest">Forest</option>
                    <option value="sunset">Sunset</option>
                    <option value="ocean">Ocean</option>
                </select>
                <select
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    value={i18n.language}
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white border-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                </select>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">{t('common.login')}</h2>
                {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 mb-4 rounded border border-red-200 dark:border-red-800">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">{t('common.email')}</label>
                        <input
                            type="email"
                            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">{t('common.password')}</label>
                        <input
                            type="password"
                            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {t('common.login')}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    {t('auth.noAccount')} <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">{t('common.register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
