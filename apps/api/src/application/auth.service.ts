import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../domain/interfaces';
import { User } from '../domain/entities';

export class AuthService {
    constructor(private userRepository: IUserRepository) { }

    async register(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ user: Omit<User, 'password'>; token: string }> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password!, 10);
        const newUser = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        const token = this.generateToken(newUser.id);
        const { password, ...userWithoutPassword } = newUser;

        return { user: userWithoutPassword, token };
    }

    async login(credentials: { email: string; password: string }): Promise<{ user: Omit<User, 'password'>; token: string }> {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user || !user.password) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user.id);
        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }

    private generateToken(userId: string): string {
        return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    }
}
