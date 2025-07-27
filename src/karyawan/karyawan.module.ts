import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KaryawanStreamService } from './karyawan.stream.service';
import { KaryawanStreamModule } from './karyawan.stream.module';

@Module({
  imports: [PrismaModule, KaryawanStreamModule],
  controllers: [KaryawanController],
  providers: [KaryawanService, KaryawanStreamService],
})
export class KaryawanModule {}
