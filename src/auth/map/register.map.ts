import { Role } from '../../../generated/prisma';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterMap {

    @IsString()
    @IsOptional()
    user: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsOptional()
    role: Role;
}