import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
<<<<<<< HEAD
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PagesService],
  controllers: [PagesController],
=======

@Module({
  providers: [PagesService],
  controllers: [PagesController]
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
})
export class PagesModule {}
