import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
<<<<<<< HEAD
  exports: [PrismaService],
=======
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
})
export class PrismaModule {}
