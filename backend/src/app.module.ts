import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { PartnersService } from './partners/partners.service';
import { PartnersController } from './partners/partners.controller';
import { PartnersModule } from './partners/partners.module';
import { SettingsModule } from './settings/settings.module';
import { FaqsService } from './faqs/faqs.service';
import { FaqsController } from './faqs/faqs.controller';
import { FaqsModule } from './faqs/faqs.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    PagesModule,
    CategoriesModule,
    PartnersModule,
    SettingsModule,
    FaqsModule,
  ],
  controllers: [AppController, PartnersController, FaqsController],
  providers: [AppService, PartnersService, FaqsService],
})
export class AppModule {}
