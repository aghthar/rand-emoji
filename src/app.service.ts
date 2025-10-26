import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    console.log('AppService: getEmoji called');
    const emojis = this.getEmojis();
    console.log(`our array of emojis is about ${emojis.length - 1} length`);
    const emojiIndex =
      index === undefined ? Math.floor(Math.random() * emojis.length) : index;
    return emojis[emojiIndex];
  }
  getEmojis() {
    return [
      `😀`,
      `🎉`,
      `🚀`,
      `🌟`,
      `🔥`,
      `👍`,
      `🙌`,
      `👋`,
      `👏`,
      `🎉`,
      `🤩`,
      `🥳`,
      `🤘`,
      `🤙`,
      `👌`,
      `👊`,
      `👀`,
      `💥`,
      `💫`,
      `✨`,
      `🌈`,
      `🍀`,
      `🍎`,
      `🍕`,
    ];
  }
}
