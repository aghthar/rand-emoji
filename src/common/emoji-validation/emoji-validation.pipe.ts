import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return;
    }
    if (isNaN(value)) {
      throw new BadRequestException(
        `Validation failed: ${value} is not a number`,
      );
    }
    if (isNaN(value) || value < 0) {
      throw new BadRequestException(
        `Validation failed: ${value} is not a valid emoji index`,
      );
    }
    if (isNaN(value) || value < 0 || value > 23) {
      throw new BadRequestException(
        `Validation failed: ${value} is out of range`,
      );
    }
    console.log(`EmojiValidationPipe: validated index ${value}`);
    return Number(value);
  }
}
