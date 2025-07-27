import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { UpdateAbsensiDto } from './dto/update-absensi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '../../generated/prisma';

@Injectable()
export class AbsensiService {
    constructor(private prisma: PrismaService) { }

    //Input absensi
    async create(createAbsensiDto: CreateAbsensiDto) {
        const absensiData = {
            ...createAbsensiDto,
            status: Status[createAbsensiDto.status as keyof typeof Status],
        };
        const createAbsensi = await this.prisma.absensi.create({
            data: absensiData,
        });
        if (!createAbsensi) {
            throw new HttpException(
                'Absensi could not be created',
                HttpStatus.BAD_REQUEST,
            );
        }
        return {
            statusCode: 200,
            message: 'Absensi created successfully',
            data: createAbsensi,
        };
    }

    //Get all absensi
    async findAll() {
        const allAbsensi = await this.prisma.absensi.findMany({
            select: {
                id: true,
                tanggal: true,
                waktu: true,
                status: true,
                karyawanId: true,
            },
        });

        if (!allAbsensi) {
            throw new HttpException('No absensi found', HttpStatus.NOT_FOUND);
        }

        return {
            statusCode: 200,
            message: 'All data absensi',
            data: allAbsensi,
        };
    }

    //detail absensi by user
    async findOne(id: number) {
        const findAbsensiId = await this.prisma.absensi.findFirst({
            where: {
                karyawanId: id,
            },
        });
        if (!findAbsensiId) {
            throw new HttpException('Absensi not found', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: 200,
            message: 'Absensi found',
            data: findAbsensiId,
        };
    }
}
