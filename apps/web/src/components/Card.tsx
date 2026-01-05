import React, { HTMLAttributes } from 'react';

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
    return (
        <div className={`card ${className}`} {...props}>
            {children}
        </div>
    );
};
