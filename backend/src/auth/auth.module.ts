import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('app.jwt.secret'),
        signOptions: { expiresIn: config.get('app.jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    // Optional: Apply JWT guard globally - uncomment if you want this behavior
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
