import { IExpenseRepository } from '../domain/interfaces';
import { Expense } from '../domain/entities';

export class ExpenseService {
    constructor(private expenseRepository: IExpenseRepository) { }

    async createExpense(userId: string, data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Expense> {
        return this.expenseRepository.create({
            ...data,
            userId,
        });
    }

    async getUserExpenses(userId: string): Promise<Expense[]> {
        return this.expenseRepository.findAllByUserId(userId);
    }

    async deleteExpense(userId: string, expenseId: string): Promise<void> {
        const expense = await this.expenseRepository.findById(expenseId);
        if (!expense) throw new Error('Expense not found');
        if (expense.userId !== userId) throw new Error('Unauthorized');

        await this.expenseRepository.delete(expenseId);
    }
}
