import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { UserModule } from 'src/user/user.module';
import { CommentRepository } from 'src/news/comment.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env',
    // }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // JwtModule.register({
    //   secret: process.env.JWT_SEC,
    //   signOptions: {
    //     expiresIn: process.env.JWT_EXP,
    //   },
    // }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SEC'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXP') },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CommentRepository, UserRepository]),

    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
