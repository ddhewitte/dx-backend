import { Role } from '../../../generated/prisma';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateMap {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsEnum(Role, { message: "role must be Admin/User" })
    @IsOptional()
    role: Role
}
