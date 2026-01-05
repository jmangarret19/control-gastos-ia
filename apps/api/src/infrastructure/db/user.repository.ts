import { IUserRepository } from '../../domain/interfaces';
import { User } from '../../domain/entities';
import prisma from './client';

export class PrismaUserRepository implements IUserRepository {
    async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password!, // Password should be hashed before reaching here ideally, or here.
                name: data.name,
            },
        });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }
}
