import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { EmojiValidationPipe } from './common/emoji-validation/emoji-validation.pipe';
import express from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEmoji(
    @Req() request: express.Request,
    @Query(`index`, EmojiValidationPipe) index?: number,
  ) {
    return {
      emoji: this.appService.getEmoji(index),
      browser: request.headers.browser || 'Unknown',
    };
  }
}
