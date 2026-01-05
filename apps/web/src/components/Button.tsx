import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className = '',
    variant = 'primary',
    isLoading,
    children,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;

    return (
        <button
            className={`${baseClass} ${variantClass} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? '...' : children}
        </button>
    );
};
