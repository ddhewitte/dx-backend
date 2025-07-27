import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { KaryawanModule } from './karyawan/karyawan.module';
import { AbsensiModule } from './absensi/absensi.module';

@Module({
  imports: [PrismaModule, AuthModule, KaryawanModule, AbsensiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
