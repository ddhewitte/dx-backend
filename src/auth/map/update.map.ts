import { Role } from '../../../generated/prisma';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateMap {
    @IsOptional()
    @IsString()
    user: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsEnum(Role, { message: "role must be Admin/User" })
    @IsOptional()
    role: Role
}
