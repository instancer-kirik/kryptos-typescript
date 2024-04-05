import { generateAlphabet } from './lib/alphabet';
import { vigDecrypt } from './lib/vigenere';
export const encryptedK4 =
                             'OBKR' +
  'UOXOGHULBSOLIFBBWFLRVQQPRNGKSSO' +
  'TWTQSJQSSEKZZWATJKLUDIAWINFBNYP' +
  'VTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR';
  
  
  
  
  
          'OBKR' +
  'UOXOGHULBSOLIFBBWFLRVQQPRNGKSSOTWTQSJQSSEKZZWATJKLUDIAWINFBNYP' +
  'VTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR';
  
// If you can solve this you will be famous among
//  a small and very odd group of people.

export function ratePossibleK4SolutionV1(attempt: string): number {
  attempt = attempt.toUpperCase();
  const reversed = attempt.split('').reverse().join('');

  let score = 0;

  if (attempt.includes('NORTHEAST') || reversed.includes('NORTHEAST')) {
    score++;
  }

  if (
    attempt.slice(21).startsWith('NORTHEAST') ||
    reversed.slice(21).startsWith('NORTHEAST')
  ) {
    score++;
  }

  if (attempt.includes('BERLINCLOCK') || reversed.includes('BERLINCLOCK')) {
    score++;
  }

  if (
    attempt.slice(63).startsWith('BERLINCLOCK') ||
    reversed.slice(63).startsWith('BERLINCLOCK')
  ) {
    score++;
  }

  return score;
}

// Gives points if you have all the necessary letters to match the clues,
//  not just if you have them verbatim. Sniffs out attempts
//  that might be correct after some kind of transposition.
export function ratePossibleK4Solution(attempt: string): number {
  let score = ratePossibleK4SolutionV1(attempt) * 10;

  const attemptChars = attempt.split('');
  const phrase1 = 'NORTHEAST'.split('');
  const phrase2 = 'BERLINCLOCK'.split('');

  let hasAllChars1 = true;
  for (const char of phrase1) {
    const matchingIndex = attemptChars.indexOf(char);
    if (matchingIndex === -1) {
      hasAllChars1 = false;
      break;
    }

    attemptChars.splice(matchingIndex, 1);
  }

  if (hasAllChars1) {
    score++;
  }

  let hasAllChars2 = true;
  for (const char of phrase2) {
    const matchingIndex = attemptChars.indexOf(char);
    if (matchingIndex === -1) {
      hasAllChars2 = false;
      break;
    }

    attemptChars.splice(matchingIndex, 1);
  }

  if (hasAllChars2) {
    score++;
  }

  return score;
}
// Main function to try a batch of keys
function tryBatchOfKeys(encrypted: string, keys: string[], alphabet: string) {
  keys.forEach(key => {
      const attempt = vigDecrypt(encrypted, key, alphabet);
      const rating = ratePossibleK4Solution(attempt);
      console.log(`Key: ${key}, Rating: ${rating}`);
      console.log(attempt); // Log the decryption attempt
      console.log('-----------------------------------');
  });
}

function generateAlphabetShifts(baseAlphabet: string): string[] {
  let shifts = [];
  for (let i = 0; i < baseAlphabet.length; i++) {
      let shiftedAlphabet = baseAlphabet.slice(i) + baseAlphabet.slice(0, i);
      shifts.push(shiftedAlphabet);
      shifts.push(shiftedAlphabet.split('').reverse().join(''))
  }
  console.log(shifts)
  return shifts;
}
function tryKeysForBStart2(encrypted: string, specificKeys: string[], baseAlphabet: string) {
  // Combine specific keys with shifted and flipped alphabets as potential keys
  const potentialKeys = [...specificKeys, ...generateAlphabetShifts(baseAlphabet)];

  potentialKeys.forEach((key, index) => {
      const decryptedAttempt = vigDecrypt(encrypted, key, baseAlphabet);
      if (decryptedAttempt.toUpperCase().startsWith('B')) {
          console.log(`Successful Key (Index ${index}): ${key}`);
          console.log(`Decrypted Text: ${decryptedAttempt}`);
          // Consider breaking here if you're only looking for the first successful attempt
      }
  });
}
function tryKeysForBStart21(encrypted: string, keys: string[], baseAlphabet: string) {
  const alphabetShifts = generateAlphabetShifts(baseAlphabet);
  keys.forEach(key => {

    for (let i = 0; i < alphabetShifts.length; i++) {
      const alphabet = alphabetShifts[i]; // Using each shifted alphabet as a key
      const decryptedAttempt = vigDecrypt(encrypted, key, alphabet);
      
      if (decryptedAttempt.startsWith('BERLIN')) {
          console.log(`Successful Key (Alphabet Shift ${i}): ${key}`);
          console.log(`Decrypted Text: ${decryptedAttempt}`);
          
          //break; // Break the loop if the criteria is met
      }

  }

  

    // const attempt = vigDecrypt(encrypted, key, alphabet);
    // const rating = ratePossibleK4Solution(attempt);
    // console.log(`Key: ${key}, Rating: ${rating}`);
    // console.log(attempt); // Log the decryption attempt
    // console.log('-----------------------------------');
});
  
}


function* generateNLetterPairs(N: number, baseAlphabet: string): IterableIterator<string> {
  if (N === 1) {
      for (let letter of baseAlphabet) {
          yield letter;
      }
  } else {
      for (let pair of generateNLetterPairs(N - 1, baseAlphabet)) {
          for (let letter of baseAlphabet) {
              yield pair + letter;
          }
      }
  }
}

function tryKeysForBStart(encrypted: string, keysGenerator: IterableIterator<string>, baseAlphabet: string) {
  const alphabetShifts = generateAlphabetShifts(baseAlphabet); // Assuming this function exists and is correct
  for (let key of keysGenerator) {
      for (let alphabetShift of alphabetShifts) {
          const decryptedAttempt = vigDecrypt(encrypted, key, alphabetShift);
          if (decryptedAttempt.startsWith('BERLIN')) {
              console.log(`Successful Key: ${key}`);
              console.log(`Decrypted Text: ${decryptedAttempt}`);
              // Optionally break if you only need the first match
          }
      }
  }
}
function* generateMatchingFirstThird(N: number, baseAlphabet: string): IterableIterator<string> {
  if (N < 3) {
      // If N is less than 3, it's impossible to enforce the first and third characters to match.
      console.log("N must be at least 3 for the first and third characters to match.");
      return;
  }
  
  // For the first and third characters to match, iterate over the alphabet once for these positions.
  for (let firstAndThirdChar of baseAlphabet) {
      // For the second character, it can be any character, so iterate over the alphabet.
      for (let secondChar of baseAlphabet) {
          // For the remaining characters (4th to Nth), generate all combinations.
          if (N === 3) {
              // If N is exactly 3, just yield the combination of first, second, and first again.
              yield firstAndThirdChar + secondChar + firstAndThirdChar;
          } else {
              // For N > 3, recursively generate combinations for the rest of the string.
              for (let restOfCombination of generateAllCombinations(N - 3, baseAlphabet)) {
                  yield firstAndThirdChar + secondChar + firstAndThirdChar + restOfCombination;
              }
          }
      }
  }
}

function* generateAllCombinations(N: number, baseAlphabet: string): IterableIterator<string> {
  if (N === 1) {
      for (let letter of baseAlphabet) {
          yield letter;
      }
  } else {
      for (let combination of generateAllCombinations(N - 1, baseAlphabet)) {
          for (let letter of baseAlphabet) {
              yield combination + letter;
          }
      }
  }
}
// Example usage
export const encryptedA =
  'NBFNIWAIDUL';
export const encryptedB =
  'NVTTMZFPKWGD'; 
  const keys = [
    'ORDINATE',
    'WONDERFULTHINGS',
    'WONDERFUL',
    'MENGENLEHREUHR',
    'MENGENLEHRE',
    'SETTHEORY',
    'DIETERBINNINGER',
    'BINNINGER',
    'MICROCONTROLLER',
    'TMS1000',
    'PMOS',
    'NEGATIVESUPPLYVOLTAGE',
    'REDANDYELLOW',
    // 'SANBORN',
    // 'KRYPTOSALPHABET',
    // 'CIAHEADQUARTERS',
    // 'SCULPTUREGARDEN',
    // 'ENCRYPTIONART',
    'SACREDGEOMETRY',
    'XYQYQQ',
    'LANGLEY',
    // 'COPPERSCROLL',
    'VISIONAIRE',
    'PALIMPSEST',
    'ABSCISSA',
    'FOCUS', 'INTENTION', 'ATTENTION', 'AWARENESS', 
    'MYSTERY', 'OBLIVIATE', 'CIPHER', 'KEY',
    // 'TIMECAPSULE',
    // 'ARCHEOCRYPTOGRAPHY'
  ]; // Example batch of keys
const alphabet = generateAlphabet('KRYPTOS','ABCDEFGHIJKLMNOPQRSTUVWXZ');
// generateAlphabetShifts(alphabet);
// tryBatchOfKeys(encryptedA, keys, alphabet);
//tryKeysForBStart(encryptedA,keys,alphabet);
// function generateNLetterPairs(N: number, baseAlphabet: string): string[] {
//   // Base case: when N is 1, simply return the alphabet as an array of its characters
//   if (N === 1) {
//     return baseAlphabet.split('');
//   } else {
//     // Recursive case: generate (N-1)-letter pairs, then append each letter of the alphabet to them
//     let smallerPairs = generateNLetterPairs(N - 1, baseAlphabet);
//     let pairs: string[] = [];

//     smallerPairs.forEach((pair) => {
//       for (let letter of baseAlphabet) {
//         pairs.push(pair + letter);
//       }
//     });

//     return pairs;
//   }
// }

const N = 6; // Change N to generate combinations of different lengths
//const pairs = generateNLetterPairs(N, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
// console.log(pairs);
// console.log(`Generated ${pairs.length} combinations.`);
const keysGenerator = generateMatchingFirstThird(N, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const keysGenerator2 = generateAllCombinations(N,"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
tryKeysForBStart(encryptedB,keysGenerator2,alphabet);
console.log(`EAUGH?!@@#!`);