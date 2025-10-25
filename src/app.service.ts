import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    console.log('AppService: getEmoji called');
    const emojis = this.getEmojis();
    const emojiIndex = index || Math.floor(Math.random() * emojis.length);
    return emojis[emojiIndex];
  }
  getEmojis() {
    return [`😀`, `🎉`, `🚀`, `🌟`, `🔥`];
  }
}
