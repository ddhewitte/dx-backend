import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterMap } from './map/register.map';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async register(data: RegisterMap) {
        const checkUserExists = await this.prisma.user.findFirst({
            where: {
                user: data.user
            }
        })
        if (checkUserExists) {
            throw new HttpException('User Already exists', HttpStatus.FOUND)
        }
        data.password = await hash(data.password, 12)
        const createUser = await this.prisma.user.create({
            data: data
        })

        if (!createUser) {
            throw new HttpException('User not created', HttpStatus.BAD_REQUEST)
        }
        return {
            statusCode: 200,
            message: 'User created successfully',
            data: createUser
        }
    }
}
