import { Module } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { AbsensiController } from './absensi.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AbsensiService],
  controllers: [AbsensiController]
})
export class AbsensiModule {}
