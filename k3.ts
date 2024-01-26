import {
  columnarDecryptLines,
  routeDecryptReadIn,
  routeDecryptUnarrange,
} from './lib/columnar-route';

const encrypted =
  'ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIA' +
  'CHTNREYULDSLLSLLNOHSNOSMRWXMNETP' +
  'RNGATIHNRARPESLNNELEBLPIIACAEWMT' +
  'WNDITEENRAHCTENEUDRETNHAEOETFOLS' +
  'EDTIWENHAEIOYTEYQHEENCTAYCREIFTB' +
  'RSPAMHHEWENATAMATEGYEERLBTEEFOAS' +
  'FIOTUETUAEOTOARMAEERTNRTIBSEDDNI' +
  'AAHTTMSTEWPIEROAGRIEWFEBAECTDDHI' +
  'LCEIHSITEGOEAOSDDRYDLORITRKLMLEH' +
  'AGTDHARDPNEOHMGFMFEUHEECDMRIPFEI' +
  'MEHNLSSTTRTVDOHW?';
const key = 'KRYPTOS';
const rectangleSize = 86;

const unreversed = encrypted.split('').reverse().join('');
const arrangedToDecrypt = routeDecryptReadIn(unreversed, rectangleSize, key);
const columnarDecrypted = columnarDecryptLines(arrangedToDecrypt, key);
const decrypted = routeDecryptUnarrange(
  columnarDecrypted,
  rectangleSize,
  key.length
);
console.log(decrypted);

/* >
?SLOWLYDESPARATLYSLOWLYTHEREMAINSOFPASSAGEDEBRISTHATENCUMBEREDTHELOWERPARTOFTHEDOORWAYWASREMOVEDWITHTREMBLINGHANDSIMADEATINYBREACHINTHEUPPERLEFTHANDCORNERANDTHENWIDENINGTHEHOLEALITTLEIINSERTEDTHECANDLEANDPEEREDINTHEHOTAIRESCAPINGFROMTHECHAMBERCAUSEDTHEFLAMETOFLICKERBUTPRESENTLYDETAILSOFTHEROOMWITHINEMERGEDFROMTHEMISTXCANYOUSEEANYTHINGQ
*/
