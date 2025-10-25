import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiValidationPipe = new EmojiValidationPipe();

  it('should be defined', () => {
    expect(emojiValidationPipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return undefined if no value is provided', () => {
      expect(emojiValidationPipe.transform(undefined)).toBeUndefined();
    });

    it('should return the value if it is a valid emoji index', () => {
      expect(emojiValidationPipe.transform(2)).toBe(2);
    });

    it(`it should return the respective string input as a number`, () => {
      const result = emojiValidationPipe.transform('2');
      expect(result).toBe(2);
    });
  });
});
