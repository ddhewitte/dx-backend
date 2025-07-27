import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATA_STREAM_RABBIT_MQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'karyawan_queue',
          queueOptions: {
            durable: false,
        },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KaryawanStreamModule {}
