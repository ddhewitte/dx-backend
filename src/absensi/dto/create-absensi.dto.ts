import { Status } from '../../../generated/prisma';
import { IsEnum, IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class CreateAbsensiDto {
    @IsDateString()
    @IsNotEmpty()
    tanggal: string;

    @IsDateString()
    @IsNotEmpty()
    waktu: string;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @IsNumber()
    karyawanId: number;
}