export interface User {
    id: string;
    email: string;
    password?: string; // Optional because we might return user without password
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    date: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
