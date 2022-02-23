import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    return;
  }
}
