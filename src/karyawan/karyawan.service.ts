import { BadRequestException, HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Jabatan } from '../../generated/prisma';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KaryawanService {
  constructor(
    private prisma: PrismaService,
    @Inject('DATA_STREAM_RABBIT_MQ') 
    private readonly client: ClientProxy,
  ){}

  //Input karyawan with images/multer
  async create(createKaryawanDto: CreateKaryawanDto, file: Express.Multer.File) {
    let imagePath: string | undefined = undefined;
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('invalid file type')
      }
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('file too large')
      }
      const filename = `${Date.now()}_${file.originalname}`;
      imagePath = `public/uploads/karyawan/${filename}`;
      const fs = await import('fs/promises');
      await fs.writeFile(imagePath, file.buffer)
    }
    const karyawanData = {
      ...createKaryawanDto,
      foto: imagePath,
      jabatan: Jabatan[createKaryawanDto.jabatan as keyof typeof Jabatan]
    }
    const createKaryawan= await this.prisma.karyawan.create({
      data: karyawanData
    })
    if (!createKaryawan) {
      throw new HttpException('Karyawan could not be created', HttpStatus.BAD_REQUEST)
    }
    return {
      statusCode: 200,
      message: 'Karyawan created successfully',
      data: createKaryawan
    }
  }
  
  //Get all karyawan
  async findAll() {
    const allKaryawan = await this.prisma.karyawan.findMany({
      select: {
        id: true,
        nama: true,
        email: true,
        foto: true,
        no_handphone: true,
        jabatan: true
      }
    });

    if (!allKaryawan) {
      throw new HttpException('No karyawan found', HttpStatus.NOT_FOUND)
    }

    return {
      statusCode: 200,
      message: 'All data karyawan',
      data: allKaryawan
    }
  }

  //Detail karyawan
  async findOne(id: number) {
    const findKaryawanId = await this.prisma.karyawan.findFirst({
      where: {
        id: id
      }
    })
    if (!findKaryawanId) {
      throw new HttpException('Karyawan not found', HttpStatus.NOT_FOUND)
    }
    return {
      statusCode: 200,
      message: 'Karyawan found',
      data: findKaryawanId
    }
  }

  //Update karyawan
  async update(id: number, updateKaryawanDto: UpdateKaryawanDto, file?: Express.Multer.File) {
    let imagePath: string | null | undefined;
    const existingKaryawan = await this.prisma.karyawan.findUnique({
      where: { id }
    })
    if (!existingKaryawan) {
      throw new HttpException('Karyawan not found', HttpStatus.NOT_FOUND)
    }
    if (file) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('invalid file type')
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('file too large')
      }

      const filename = `${Date.now()}_${file.originalname}`;
      imagePath = `public/uploads/karyawan/${filename}`;
      const fs = await import('fs/promises')
      await fs.writeFile(imagePath, file.buffer)

      if (existingKaryawan.foto) {
        await fs.unlink(existingKaryawan.foto).catch((err) => {
          console.warn(`failed to delete old foto: ${err.message}`)
        })
      }
    } else {
      imagePath = existingKaryawan.foto
    }
    const updatedData = {
      ...updateKaryawanDto,
      foto: imagePath
    }
    const updateKaryawan = await this.prisma.karyawan.update({
      where: { id: id },
      data: updatedData
    })

    // Sent to Rabbit
    this.client.emit('karyawan.updated', {
      id,
      updatedAt: new Date(),
      ...updatedData,
    });

    return {
      statusCode: 200,
      message: 'Karyawan updated successfully',
      data: updateKaryawan
    }
  }

  async remove(id: number) {
    const karyawanFind = await this.prisma.karyawan.findUnique({
      where: {
        id: id
      }
    })
    if (!karyawanFind) {
      throw new HttpException('Karyawan not found', HttpStatus.NOT_FOUND)
    }
    if (karyawanFind.foto) {
      const fs = await import('fs/promises')
      await fs.unlink(karyawanFind.foto).catch((err) => {
        console.warn(`failed to delete foto: ${err.message}`)
      })
    }
    const deleteProduct = await this.prisma.karyawan.delete({
      where: {
        id: id
      }
    })
    return {
      statusCode: 200,
      message: 'Karyawan deleted successfully', data: deleteProduct
    }
  }

}
