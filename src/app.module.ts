import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './modules/ai/ai.module';
import { OndcModule } from './modules/ondc/ondc.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule,
  UsersModule,
  AiModule,
  OndcModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
