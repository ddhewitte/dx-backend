import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KaryawanStreamService {
  @EventPattern('event.karyawan.created')
  handleKaryawanCreated(@Payload() data: any) {
    console.log('Received from Rabbit:', data);
  }
}
