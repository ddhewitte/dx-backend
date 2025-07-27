import { Jabatan } from '../../../generated/prisma';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, Min } from "class-validator";

export class CreateKaryawanDto {
    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    foto?: string;
    
    @IsString()
    @IsOptional()
    no_handphone: string;

    @IsEnum(Jabatan)
    jabatan: Jabatan;

    @IsNumber()
    userId: number;
}
