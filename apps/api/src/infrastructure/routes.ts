import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';
import { ExpenseController } from './controllers/expense.controller';
import { AuthService } from '../application/auth.service';
import { ExpenseService } from '../application/expense.service';
import { PrismaUserRepository } from './db/user.repository';
import { PrismaExpenseRepository } from './db/expense.repository';
import { authMiddleware } from './middleware/auth.middleware';

const router = Router();

// Dependency Injection
const userRepository = new PrismaUserRepository();
const expenseRepository = new PrismaExpenseRepository();

const authService = new AuthService(userRepository);
const expenseService = new ExpenseService(expenseRepository);

const authController = new AuthController(authService);
const expenseController = new ExpenseController(expenseService);

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Expense Routes
router.post('/expenses', authMiddleware, expenseController.create);
router.get('/expenses', authMiddleware, expenseController.list);
router.delete('/expenses/:id', authMiddleware, expenseController.delete);

export default router;
