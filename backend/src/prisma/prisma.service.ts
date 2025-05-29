import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';
=======
import { PrismaClient } from '.prisma/client';
>>>>>>> 505917239e023882bbe548340b665dd061797bf9

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
<<<<<<< HEAD
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.$disconnect();
      await app.close();
    });
  }
}
=======
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
>>>>>>> 505917239e023882bbe548340b665dd061797bf9
