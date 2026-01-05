import { Request, Response, NextFunction } from 'express';
import { ExpenseService } from '../../application/expense.service';

// Extend Request to include user property (populated by middleware)
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    create = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.userId;
            const { description, amount, date } = req.body;
            const expense = await this.expenseService.createExpense(userId, {
                description,
                amount: Number(amount),
                date: new Date(date)
            });
            res.status(201).json(expense);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    list = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.userId;
            const expenses = await this.expenseService.getUserExpenses(userId);
            res.json(expenses);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.userId;
            const { id } = req.params;
            await this.expenseService.deleteExpense(userId, id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
