import { Jabatan } from '../../../generated/prisma';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, Min } from "class-validator";
import { Transform } from 'class-transformer';

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
    @Transform(({ value }) => parseInt(value, 10))
    userId: number;
}
