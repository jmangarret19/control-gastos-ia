import { IExpenseRepository } from '../../domain/interfaces';
import { Expense } from '../../domain/entities';
import prisma from './client';

export class PrismaExpenseRepository implements IExpenseRepository {
    async create(data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> {
        return prisma.expense.create({
            data
        });
    }

    async findAllByUserId(userId: string, startDate?: Date, endDate?: Date): Promise<Expense[]> {
        const whereClause: any = { userId };
        
        if (startDate || endDate) {
            whereClause.date = {};
            if (startDate) whereClause.date.gte = startDate;
            if (endDate) whereClause.date.lte = endDate;
        }

        return prisma.expense.findMany({
            where: whereClause,
            orderBy: { date: 'desc' }
        });
    }

    async findById(id: string): Promise<Expense | null> {
        return prisma.expense.findUnique({ where: { id } });
    }

    async update(id: string, data: Partial<Expense>): Promise<Expense> {
        return prisma.expense.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.expense.delete({ where: { id } });
    }
}
