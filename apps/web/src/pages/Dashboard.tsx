import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface Expense {
    id: string;
    description: string;
    amount: number;
    date: string;
}

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();

    const fetchExpenses = async () => {
        try {
            const response = await api.get<Expense[]>('/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Failed to fetch expenses', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/expenses', { description, amount, date });
            setDescription('');
            setAmount('');
            fetchExpenses();
        } catch (error) {
            console.error('Failed to add expense', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('dashboard.confirmDelete'))) return;
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(expenses.filter(e => e.id !== id));
        } catch (error) {
            console.error('Failed to delete expense', error);
        }
    };

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="min-h-screen transition-colors duration-300 flex flex-col bg-[var(--bg-base)] text-[var(--text-base)]">
            <header className="bg-[var(--bg-card)] shadow p-4 flex justify-between items-center z-10 sticky top-0 border-b border-[var(--border-color)]">
                <h1 className="text-xl font-bold text-[var(--text-base)] hidden md:block">{t('dashboard.title')}</h1>
                <div className="flex items-center gap-4 ml-auto">
                    <span className="text-[var(--text-muted)] text-sm hidden sm:inline">{t('common.welcome', { name: user?.name })}</span>

                    <select
                        onChange={(e) => {
                            const val = e.target.value as any;
                            setTheme(val);
                        }}
                        value={theme}
                        className="px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--text-base)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary)] text-sm"
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
                        className="px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--text-base)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary)] text-sm"
                    >
                        <option value="es">ES</option>
                        <option value="en">EN</option>
                    </select>

                    <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium text-sm">{t('common.logout')}</button>
                </div>
            </header>

            <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">

                {/* Summary Cards */}
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-card)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
                        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase">{t('dashboard.totalExpenses')}</h3>
                        <p className="text-3xl font-bold text-[var(--text-base)] mt-2">{expenses.length}</p>
                    </div>
                    <div className="bg-[var(--bg-card)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
                        <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase">{t('dashboard.totalAmount')}</h3>
                        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">${totalAmount.toFixed(2)}</p>
                    </div>
                </div>

                {/* Add Expense Form */}
                <div className="bg-[var(--bg-card)] p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
                    <h2 className="text-lg font-semibold mb-4 text-[var(--text-base)]">{t('dashboard.addExpense')}</h2>
                    <form onSubmit={handleAddExpense} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder={t('dashboard.description')}
                            className="flex-grow bg-[var(--bg-base)] text-[var(--text-base)] border border-[var(--border-color)] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm placeholder-[var(--text-muted)]"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder={t('dashboard.amount')}
                            className="w-full md:w-32 bg-[var(--bg-base)] text-[var(--text-base)] border border-[var(--border-color)] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm placeholder-[var(--text-muted)]"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className="bg-[var(--bg-base)] text-[var(--text-base)] border border-[var(--border-color)] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-[var(--primary)] hover:opacity-90 text-[var(--primary-fg)] px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
                            {t('common.add')}
                        </button>
                    </form>
                </div>

                {/* Expenses List */}
                <div className="bg-[var(--bg-card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)]">
                    <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-base)] bg-opacity-50">
                        <h2 className="text-lg font-semibold text-[var(--text-base)]">{t('dashboard.yourExpenses')}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[var(--bg-base)] text-[var(--text-muted)] uppercase text-sm border-b border-[var(--border-color)]">
                                <tr>
                                    <th className="py-3 px-4">{t('dashboard.date')}</th>
                                    <th className="py-3 px-4">{t('dashboard.description')}</th>
                                    <th className="py-3 px-4 text-right">{t('dashboard.amount')}</th>
                                    <th className="py-3 px-4 text-center">{t('dashboard.action')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[var(--text-base)] divide-y divide-[var(--border-color)]">
                                {expenses.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-[var(--text-muted)]">{t('dashboard.noExpenses')}</td>
                                    </tr>
                                ) : (
                                    expenses.map(expense => (
                                        <tr key={expense.id} className="hover:bg-[var(--bg-base)] transition-colors">
                                            <td className="py-3 px-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString()}</td>
                                            <td className="py-3 px-4 font-medium">{expense.description}</td>
                                            <td className="py-3 px-4 text-right font-medium text-[var(--text-base)]">${expense.amount.toFixed(2)}</td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(expense.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                    title={t('common.delete')}
                                                >
                                                    &times;
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
