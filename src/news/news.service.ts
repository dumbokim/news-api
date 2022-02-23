import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class NewsService {
  constructor(private authService: AuthService) {}
}
