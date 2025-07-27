import { Controller, Get, Post, Body, Patch, Param, Delete,  UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @UseGuards(new AuthGuard(['ADMIN', 'USER']))
  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: 'public/uploads/karyawan',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createKaryawanDto: CreateKaryawanDto,
  ) {
    return await this.karyawanService.create(createKaryawanDto, file);
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF', 'USER']))
  @Get()
  async findAll() {
    return await this.karyawanService.findAll();
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.karyawanService.findOne(+id);
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  async update(
    @Param('id') id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.karyawanService.update(+id, updateKaryawanDto, file);
  }

  @UseGuards(new AuthGuard(['ADMIN']))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.karyawanService.remove(+id);
  }
}
