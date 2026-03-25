import { Request, Response } from 'express';
import { ChatService } from '../../application/chat.service';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export class ChatController {
    constructor(private chatService: ChatService) {}

    ask = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const { question } = req.body;

            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            if (!question) {
                res.status(400).json({ error: 'La pregunta es requerida' });
                return;
            }

            const answer = await this.chatService.askQuestion(userId, question);
            res.json({ answer });
        } catch (error: any) {
            console.error('Error en ChatController:', error);
            res.status(500).json({ error: 'Error interno del servidor procesando la consulta de IA.' });
        }
    };
}
