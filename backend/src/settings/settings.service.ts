import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  async onModuleInit() {
    const settings = await this.prisma.setting.findFirst();
    if (!settings) {
      await this.prisma.setting.create({
        data: {
          siteTitle: 'Phillip Trustee',
          description: '',
        },
      });
    }
  }

  async findSettings() {
    return this.prisma.setting.findFirst();
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const settings = await this.prisma.setting.findFirst();
    if (!settings) {
      throw new Error('Settings not found');
    }
    return this.prisma.setting.update({
      where: { id: settings.id },
      data: updateSettingsDto,
    });
  }
}
