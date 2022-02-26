import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('')
  async getAllComments(@Req() req: Request) {
    const user = req.user;

    const comments = await this.commentService.getAllComments(user);

    return comments;
  }
}
