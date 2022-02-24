import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { MailModule } from './mail/mail.module';
import { Comment } from './model/comment.entity';
import { News } from './model/news.entity';
import { User } from './model/user.entity';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      entities: [User, News, Comment],
      synchronize: true,
    }),

    NewsModule,
    UserModule,
    AuthModule,

    // MailModule.forRoot({
    //   apiKey: process.env.ACS_KEY,
    //   secret: process.env.SEC_KEY,
    //   senderAddress: process.env.SEND_ADRS,
    //   language: 'ko-KR',
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
