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

    it('should throw an error if the value is not a number', () => {
      expect(() => emojiValidationPipe.transform('invalid')).toThrowError(
        'Validation failed: invalid is not a valid emoji index',
      );
    });

    it('should throw an error if the value is out of range', () => {
      expect(() => emojiValidationPipe.transform(5)).toThrowError(
        'Validation failed: 5 is out of range',
      );
    });
  });
});
