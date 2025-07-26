import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterMap } from './map/register.map';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt_config';
import { LoginMap } from './map/login.map';
import { UpdateMap } from './map/update.map';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    //generateJWT
    generateJWT(payload: any){
        return this.jwtService.sign(payload, {
            secret: jwt_config.secret,
            expiresIn: jwt_config.expired
        })
    }

    //login
    async login(data: LoginMap) {
        const checkUserExists = await this.prisma.user.findFirst({
            where: {
                user: data.user
            }
        })
        if (!checkUserExists) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        const checkPassword = await compare(data.password, checkUserExists.
            password)
        if (checkPassword) {
            const accessToken = this.generateJWT({
                sub: checkUserExists.id,
                name: checkUserExists.user,
                role: checkUserExists.role
            })
            return {
                statusCode: 200,
                message: 'Login Successfully',
                accessToken: accessToken
            }
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
        }
    }

    
    //register
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

    //Detail user
    async profile(user_id: number) {
        const detailProfile = await this.prisma.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                user: true,
                role: true
            }
        })
        if (detailProfile) {
            return {
                statusCode: 200,
                message: 'User detail',
                data: detailProfile
            }
        }
    }

    //Show all user
    async showAllUser() {
        const allUser = await this.prisma.user.findMany({
            select: {
                id: true,
                user: true,
                role: true
            }
        })
        if (!allUser) {
            throw new HttpException('User empty', HttpStatus.NOT_FOUND)
        }
        return {
            statusCode: 200,
            message: 'All User',
            data: allUser
        }
    }

    //Update
    async updateUser(userId: number, data: UpdateMap) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: data
        })
        return {
            statusCode: 200,
            message: 'User updated successfully',
            data: updatedUser
        }
    }

}
