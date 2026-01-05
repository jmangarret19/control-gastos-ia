import React from 'react';
import { Button } from './Button';
import { LogOut } from 'lucide-react';

interface NavbarProps {
    user?: { name: string } | null;
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
    return (
        <nav style={{
            padding: '1rem 0',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0, background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vector Shuttle</h1>

                {user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Hello, {user.name}</span>
                        <Button variant="secondary" onClick={onLogout} style={{ padding: '0.5rem' }}>
                            <LogOut size={18} />
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};
