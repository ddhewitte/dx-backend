import { Controller, Get, Post, Body, Patch, Param, Delete,  UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { UpdateAbsensiDto } from './dto/update-absensi.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('absensi')
export class AbsensiController {
    constructor(private readonly absensiService: AbsensiService) {}
    
    //Input absensi
    @UseGuards(new AuthGuard(['ADMIN', 'USER']))
    @Post()
    async create(
        @Body() createAbsensiDto: CreateAbsensiDto,
    ) {
        return await this.absensiService.create(createAbsensiDto);
    }

    //List absensi
    @UseGuards(new AuthGuard(['ADMIN', 'USER']))
    @Get()
    async findAll() {
        return await this.absensiService.findAll();
    }

    //Detail absensi by karyawanId
    @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
    @Get(':id')
    async findAllByKaryawan(@Param('id') id: string) {
        return await this.absensiService.findByKaryawanId(+id);
    }

}
