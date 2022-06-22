const fs = require('fs')

const textFilesPath = 'assets'

const rusFile = 'russian-text.txt'
const latinFile = 'latin-text.txt'
// const latinBinFile = 'latin-binary.txt'
// const rusBinFile = 'rus-bin.txt'

let rusFileText;
let latinFileText;
let latinBinFileText;
let rusBinFileText;
try {
    latinFileText = fs.readFileSync(`${textFilesPath}/${latinFile}`, 'utf-8')
    rusFileText = fs.readFileSync(`${textFilesPath}/${rusFile}`, 'utf-8')
    latinBinFileText = fs.readFileSync(`${textFilesPath}/${latinFile}`, 'utf-8')
    rusBinFileText = fs.readFileSync(`${textFilesPath}/${rusFile}`, 'utf-8')
} catch(err) {
    console.log(`reading text file error:`, err);
}

const rusFileTextFormatted = formatText(rusFileText,
    (text) => text.toLowerCase(), 
    (text) => text.replace(/(\r\n|\n|\r)/gm, '')
)
const latinFileTextFormatted = formatText(latinFileText,
    (text) => text.toLowerCase(), 
    (text) => text.replace(/(\r\n|\n|\r)/gm, '')
)
const latinBinTextFormatted = formatText(latinBinFileText, 
    (text) => text.replace(/(\r\n|\n|\r)/gm, ''),
    (text) => strToBinary(text)
)
const rusBinTextFormatted = formatText(rusBinFileText, 
    (text) => text.replace(/(\r\n|\n|\r)/gm, ''),
    (text) => strToBinary(text)
)
// console.log('latin', latinFileTextFormatted);
// console.log('latin bin', latinBinTextFormatted);

// ========== TASK a ===============
const E1 = calcEntropy(latinFileTextFormatted)
const E2 = calcEntropy(rusFileTextFormatted)
console.log('latin E:', E1);
console.log('rus E:', E2);

// ========== TASK b ===============
const E3 = calcEntropy(latinBinTextFormatted)
const E4 = calcEntropy(rusBinTextFormatted)
console.log('latin bin E', E3);
console.log('rus bin E', E4);

// ========== TASK c ===============
const fio = 'KubarkoNikitaValerievich'
const I1 = E1 * fio.length
const I2 = E3 * fio.length * 8

console.log('I1 for latin (bit):', I1);
console.log('I2 for binary (bit):', I2);

// ========== TASK d ===============
const Ep1 = calcEntropyWithNoise(0.1)
const Ep2 = calcEntropyWithNoise(0.5)
const Ep3 = calcEntropyWithNoise(1)
const EEffective1 = 1 - Ep1
const EEffective2 = 1 - Ep2
const EEffective3 = 1 - Ep3
console.log('Effective Entropies: ', EEffective1, EEffective2, EEffective3);

const I1E1 = EEffective1 * fio.length
const I1E2 = EEffective2 * fio.length
const I1E3 = EEffective3 * fio.length

const I2E1 = EEffective1 * fio.length * 8
const I2E2 = EEffective2 * fio.length * 8
const I2E3 = EEffective3 * fio.length * 8

console.log();
console.group('FOR LATIN');
console.log(`p = 0.1 -> ${I1E1} bit`);
console.log(`p = 0.5 -> ${I1E2} bit`);
console.log(`p = 1 -> ${I1E3} bit`);
console.groupEnd()

console.group('FOR BINARY');
console.log(`p = 0.1 for bin -> ${I2E1} bit`);
console.log(`p = 0.5 for bin -> ${I2E2} bit`);
console.log(`p = 1 for bin -> ${I2E3} bit`);
console.groupEnd()

function processText(text) {
    const mapping = {}
    const N = text.length
    text.split('').forEach(char => {
        if (!mapping[char]) {
            mapping[char] = {
                count: 1,
                p: null
            }
        } else {
            mapping[char]['count']++
        }
    })
    Object.keys(mapping).forEach(char => {
        mapping[char].p = mapping[char].count / N
    })
    return mapping
}

function calcEntropy(text) {
    const mapping = processText(text)
    // console.log(mapping);
    const entropy = Object.keys(mapping).map(char => mapping[char]).reduce((entropy, data) => {
        entropy += data.p * Math.log2(data.p)
        return entropy
    }, 0)
    return -entropy
}

function formatText(text, ...formatters) {
    let res = text
    formatters.forEach(f => {
        res = f(res)
    })
    return res
}

function strToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('')
}

function calcEntropyWithNoise(p) {
    return -p * Math.log2(p) - (1 - p) * Math.log2(1 - p) || 1
}