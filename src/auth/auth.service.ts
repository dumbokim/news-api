import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  // constructor(private mailService: MailService) {}

  async login(loginDto: LoginDto) {
    return '';
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
