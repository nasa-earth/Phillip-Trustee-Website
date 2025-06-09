import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  private readonly logger = new Logger(PartnersService.name);

  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    this.logger.log(`Creating new partner: ${createPartnerDto.name}`);
    return this.prisma.partner.create({
      data: createPartnerDto,
    });
  }

  async findAll() {
    return this.prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      this.logger.warn(`Partner with ID "${id}" not found`);
      throw new NotFoundException(`Partner with ID "${id}" not found`);
    }

    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    await this.findOne(id); // Verify partner exists

    this.logger.log(`Updating partner: ${id}`);
    return this.prisma.partner.update({
      where: { id },
      data: updatePartnerDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify partner exists

    this.logger.log(`Removing partner: ${id}`);
    return this.prisma.partner.delete({
      where: { id },
    });
  }
}
