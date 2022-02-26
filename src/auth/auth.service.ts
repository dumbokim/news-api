import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyTokenResponseDto } from './dto/verify-token-response.dto';
import * as bcrypt from 'bcrypt';

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
      const { password } = loginDto;

      const isUser = await bcrypt.compare(password, user.password);

      if (isUser) {
        const { id, name, email } = user;

        const accessToken = this.jwtService.sign({ name, id, email });

        return { accessToken, name, email };
      }
    } else {
      throw new NotFoundException();
    }
  }

  async findUser(loginDto: LoginDto) {
    const { id } = loginDto;

    const user = await this.userRepository.findOne({ id });

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
    const { name, id, email, password } = createUserDto;

    // const checkEmail = await this.checkUserEmail(email);

    const salt = await bcrypt.genSalt();

    const hashedPwd = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      id,
      email,
      password: hashedPwd,
    });

    try {
      const result = await this.userRepository.save(user);

      return result;
    } catch (error) {
      console.log('error : ', error);
    }

    // if (checkEmail) {
    //   const signupVerifyToken = uuid.v1();

    //   const { name, id, password } = createUserDto;

    //   await this.saveUser(name, id, password, signupVerifyToken);

    //   // await this.sendMemberJoinEmail(email, signupVerifyToken);
    // }
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
