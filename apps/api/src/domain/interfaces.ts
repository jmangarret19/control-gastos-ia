import { User, Expense } from './entities';

export interface IUserRepository {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}

export interface IExpenseRepository {
    create(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense>;
    findAllByUserId(userId: string): Promise<Expense[]>;
    findById(id: string): Promise<Expense | null>;
    update(id: string, expense: Partial<Expense>): Promise<Expense>;
    delete(id: string): Promise<void>;
}
