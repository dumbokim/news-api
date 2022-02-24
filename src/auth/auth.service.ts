import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyTokenResponseDto } from './dto/verify-token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.findUser(loginDto);

    if (user) {
      const { id, name } = user;

      const accessToken = this.jwtService.sign({ name, id });

      return { accessToken };
    } else {
      throw new NotFoundException();
    }
  }

  async findUser(loginDto: LoginDto) {
    const { id, password } = loginDto;

    const user = await this.userRepository.findOne({ id, password });

    return user;
  }

  async findUserByToken(user: any) {
    const { name, id } = user;

    const userInfo = await this.userRepository.findOne({ name, id });

    const response = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    };

    return response;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const checkEmail = await this.checkUserEmail(email);

    if (checkEmail) {
      const signupVerifyToken = uuid.v1();

      const { name, id, password } = createUserDto;

      await this.saveUser(name, id, password, signupVerifyToken);

      // await this.sendMemberJoinEmail(email, signupVerifyToken);
    }
    return '';
  }

  private async checkUserEmail(email: string) {
    return false;
  }

  private async saveUser(
    name: string,
    id: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  async checkUser() {
    return;
  }

  // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
  //   await this.mailService.sendMemberJoinEmail(email, signupVerifyToken);
  // }
}
