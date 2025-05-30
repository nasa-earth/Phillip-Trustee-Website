import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    try {
      await this.prisma.$executeRaw`
        INSERT INTO "Setting" ("id", "siteTitle", "updatedAt")
        SELECT gen_random_uuid(), 'Phillip Trustee', NOW()
        WHERE NOT EXISTS (SELECT 1 FROM "Setting" LIMIT 1)
      `;
    } catch (error) {
      console.error('Failed to initialize settings:', error);
      throw error;
    }
  }

  async findSettings() {
    try {
      return await this.prisma.setting.findFirst();
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      throw error;
    }
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    try {
      const settings = await this.prisma.setting.findFirst();
      if (!settings) {
        throw new Error('Settings not found');
      }
      return await this.prisma.setting.update({
        where: { id: settings.id },
        data: {
          ...updateSettingsDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }
}
