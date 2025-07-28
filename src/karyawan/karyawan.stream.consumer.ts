import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KaryawanConsumer {
  private readonly logger = new Logger(KaryawanConsumer.name);

  @EventPattern('karyawan.updated')
  async handleKaryawanUpdated(@Payload() data: any) {
    this.logger.log('Menerima event karyawan.updated: ' + JSON.stringify(data));
  }
}
