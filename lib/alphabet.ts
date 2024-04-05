export const standardAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function generateAlphabet(prefix: string, baseAlphabet?: string): string {
  // Use baseAlphabet if provided, otherwise use standardAlphabet
  const alphabet = baseAlphabet || standardAlphabet;
  return prefix + standardAlphabet.split('').filter(ch => !prefix.includes(ch)).join('');
}

export function lettersToNumbers(text: string, alphabet: string): number[] {
  return text.split('').map(char => alphabet.indexOf(char));
}