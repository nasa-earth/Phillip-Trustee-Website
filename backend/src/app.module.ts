import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { PartnersModule } from './partners/partners.module';
import { SettingsModule } from './settings/settings.module';
import { FaqsModule } from './faqs/faqs.module';
import { EventsModule } from './events/events.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    PagesModule,
    CategoriesModule,
    PartnersModule,
    SettingsModule,
    FaqsModule,
    EventsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
