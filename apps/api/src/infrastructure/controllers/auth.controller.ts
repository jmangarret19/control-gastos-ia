import { Request, Response } from 'express';
import { AuthService } from '../../application/auth.service';

export class AuthController {
    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body;
            const result = await this.authService.register({ email, password, name });
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login({ email, password });
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    };
}
