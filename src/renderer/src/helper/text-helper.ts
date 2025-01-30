export class TextHelper {
  parseTextEnum(text: string): string {
    return text.replace('_', '').toLowerCase();
  }
}
