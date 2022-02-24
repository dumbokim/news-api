import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Public } from 'src/common/public.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);

    return accessToken;
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.createUser(createUserDto);
  }

  @UseGuards()
  @Get('/verify-token')
  async verifyToken(@Req() request: Request) {
    const user = request.user;

    return this.authService.findUserByToken(user);
  }
}
