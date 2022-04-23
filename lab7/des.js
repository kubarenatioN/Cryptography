String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += hex.padStart(2, '0');
    }

    return result.toUpperCase()
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

const CONFIG = {
	initialPerm: [
		58,	50,	42,	34,	26,	18,	10,	2,	60,	52,	44,	36,	28,	20,	12,	4,
		62,	54,	46,	38,	30,	22,	14,	6,	64,	56,	48,	40,	32,	24,	16,	8,
		57,	49,	41,	33,	25,	17,	9,	1,	59,	51,	43,	35,	27,	19,	11,	3,
		61,	53,	45,	37,	29,	21,	13,	5,	63,	55,	47,	39,	31,	23,	15,	7,
	],
	keyPerm: [
		57,	49,	41,	33,	25,	17,	9,	1,	58,	50,	42,	34,	26,	18,	
		10,	2,	59,	51,	43,	35,	27,	19,	11,	3,	60,	52,	44,	36,	
		63,	55,	47,	39,	31,	23,	15,	7,	62,	54,	46,	38,	30,	22,	
		14,	6,	61,	53,	45,	37,	29,	21,	13,	5,	28,	20,	12,	4,
	],
	keyShifts: [1, 1, 2, 2,	2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
	keyCompression: [9, 18, 22, 25, 35, 38, 43, 54],
	// keyPerm: [
	// 	14,	17,	11,	24,	1,	5,	3,	28,	15,	6,	21,	10,	23,	19,	12,	4,
	// 	26,	8,	16,	7,	27,	20,	13,	2,	41,	52,	31,	37,	47,	55,	30,	40,
	// 	51,	45,	33,	48,	44,	49,	39,	56,	34,	53,	46,	42,	50,	36,	29,	32,
	// ],
	expansionMatrix: [
		32,	1,	2,	3,	4,	5,
		4,	5,	6,	7,	8,	9,
		8,	9,	10,	11,	12,	13,
		12,	13,	14,	15,	16,	17,
		16,	17,	18,	19,	20,	21,
		20,	21,	22,	23,	24,	25,
		24,	25,	26,	27,	28,	29,
		28,	29,	30,	31,	32,	1,
	],
	substitutionBlocks: [
		[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
		0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
		4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
		15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ],
		[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
		3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
		0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
		13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ],
	  	[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
		13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
		13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
		1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ],
	  	[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
		13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
		10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
		3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ],
	  	[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
		14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
		4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
		11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ],
	  	[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
		10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
		9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
		4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ],
	  	[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
		13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
		1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
		6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ],
	  	[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
		1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
		7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
		2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ],
	],
	blockPermutation: [
		16,	7,	20,	21,	29,	12,	28,	17,
		1,	15,	23,	26,	5,	18,	31,	10,
		2,	8,	24,	14,	32,	27,	3,	9,
		19,	13,	30,	6,	22,	11,	4,	25,
	],
	finalPerm: [
		40, 8, 48, 16, 56, 24, 64, 32,
		39, 7, 47, 15, 55, 23, 63, 31,
		38, 6, 46, 14, 54, 22, 62, 30,
		37, 5, 45, 13, 53, 21, 61, 29,
		36, 4, 44, 12, 52, 20, 60, 28,
		35, 3, 43, 11, 51, 19, 59, 27,
		34, 2, 42, 10, 50, 18, 58, 26,
		33, 1, 41, 9, 49, 17, 57, 25,
	],
	keys: []
}

let message = 'HELLO WO'
// let message = 'HELLO WORLD TEST'
console.log('message', message.hexEncode());
const key = 'ABCDEFGH'

const cipher = Encode(message.hexEncode(), key)
console.log('cipher', cipher);

const decoding = Decode('24489123468D1A34', key)
console.log('decoding', decoding);

function Encode(message, key) {
	let encoding = []
	const n = Math.ceil(message.length / 16)
	console.log('length', message.length);
	for (let i = 0; i < n; i++) {
		let block = message.slice(i * 16, (i + 1) * 16)
		if (i === n - 1) {
			block = block.padEnd(16, '7')
		}
		// console.log('block', block);
		const encodedBlock = EncodeBlock(block, key)
		encoding.push(encodedBlock)
	}
	return encoding.join('')
	// return encoding
}

function Decode(cipher, key) {
	const decoding = []
	const n = Math.ceil(cipher.length / 16)
	// console.log(n);
	for (let i = 0; i < n; i++) {
		let block = cipher.slice(i * 16, (i + 1) * 16)
		const decodedBlock = DecodeBlock(block, key)
		decoding.push(decodedBlock)
	}
	return decoding
}

function EncodeBlock(block, key) {
	// console.log('block', block);
	const binaryBlock = makeChunks(block, 8, 2).map(hexChar => hex2bin(hexChar)).join('').split('')
	// logMatrix('message in bites', binaryBlock);

	const encoding = DES(binaryBlock, key)
	// console.log('encoding', makeChunks(encoding.join(''), 8, 8));
	const chars = makeChunks(encoding.join(''), 8, 8).map(binChar => binStr2hex(binChar))
	// console.log(chars);
	return chars.join('')
}

function DecodeBlock(block, key) {
	// console.log('block hex', block);
	const hexChars = []
	for (let i = 0; i < block.length / 2; i++) {
		const char = block.slice(i * 2, (i + 1) * 2)
		hexChars.push(char)
	}
	const binaryBlock = hexChars.map(char => hex2bin(char)).join('').split('')
	// console.log(binaryBlock);
	const decoding = DESDecode(binaryBlock, key)
	const chars = makeChunks(decoding.join(''), 8, 8).map(binChar => binStr2hex(binChar))
	// console.log('chars', chars);
	return chars.join('');
}

function reformMatrix(matrix, pattern) {
	const permBlock = []
	pattern.forEach((i, index) => {
		permBlock[index] = matrix[i - 1]
	})
	return permBlock
}

function DES(text, key) {
	let initialKey = makeKey(key)
	CONFIG.keys = createKeysList(initialKey)

	const initialPerm = initialPermutation(text)

	// console.log('initial permutation', initialPerm.join(''));
	console.log('Encode initial permutation', binStr2hex(initialPerm.join('')));

	let LPT = initialPerm.slice(0, 32)
	let RPT = initialPerm.slice(32)

	console.log('L0', binStr2hex(LPT.join('')), 'R0', binStr2hex(RPT.join('')));

	for (let i = 0; i < 16; i++) {
		const [l, r] = round(LPT, RPT, CONFIG.keys[i])
		LPT = l
		RPT = r
		console.log(`Encrypt round ${i + 1}: L: ${binStr2hex(LPT.join(''))} R: ${binStr2hex(RPT.join(''))} K: ${binStr2hex(CONFIG.keys[i].join(''))}`);
	}
	
	const finalPerm = finalPermutation(RPT.concat(LPT), CONFIG.finalPerm)
	// logMatrix('final permutation', finalPerm)
	return finalPerm
}

function DESDecode(text, key) {
	let initialKey = makeKey(key)
	CONFIG.keys = createKeysList(initialKey)
	// console.log(CONFIG.keys.map(k => k.join('')));

	const initialPerm = initialPermutation(text)

	console.log('Decode initial permutation', binStr2hex(initialPerm.join('')));

	let LPT = initialPerm.slice(0, 32)
	let RPT = initialPerm.slice(32)

	for (let i = 15; i >= 0; i--) {
		// console.log(`Round ${15 - i + 1}: L: ${binStr2hex(LPT)} R: ${binStr2hex(RPT)}`);
		const [l, r] = roundDecode(LPT, RPT, CONFIG.keys[i])
		LPT = l
		RPT = r
	}

	const finalPerm = finalPermutation(LPT.concat(RPT), CONFIG.finalPerm)
	// logMatrix('final permutation', finalPerm)
	return finalPerm
}

function initialPermutation(bits) {
	return reformMatrix(bits, CONFIG.initialPerm)
}

function round(L, R, key) {
	// console.log('Right before', binStr2hex(R.join('')));
	const feistelCipher = Feistel(R, key)
	const newR = modSum(L, feistelCipher)
	const newL = R
	return [newL, newR]
}

function roundDecode(L, R, key) {
	const feistelCipher = Feistel(L, key)
	const newL = modSum(R, feistelCipher)
	const newR = L
	return [newL, newR]

	// const feistelCipher = Feistel(L, key)
	// const newR = modSum(R, feistelCipher)
	// return [L, newR]
}

function Feistel(M, k) {
	const MExp = expandMatrix(M)
	const MKeySum = modSum(MExp, k)
	let blocks = makeChunks(MKeySum, 8, 6)
	blocks = substitute(blocks).join('').split('')
	return reformMatrix(blocks, CONFIG.blockPermutation)
}

function finalPermutation(m, finalPermPattern) {
	return reformMatrix(m, finalPermPattern)
}

function makeKey(key) {
	const initialKey = key.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, 0)).filter((_, i) => (i + 1) % 8).join('').split('')
	return initialKey
}

function transformKey(LKey, RKey, index) {	
	const LKShifted = shiftKey(index, LKey)
	const RKShifted = shiftKey(index, RKey)

	return [compressKey(LKShifted.concat(RKShifted)), LKShifted, RKShifted]
}

function shiftKey(roundIndex, key) {
	const left = key.slice(0, CONFIG.keyShifts[roundIndex])
	const right = key.slice(CONFIG.keyShifts[roundIndex])
	return [...right, ...left]
}

function compressKey(key) {
	return key.filter((_, i) => !CONFIG.keyCompression.includes(i + 1))
}

function createKeysList(initialKey) {
	const keys = []
	let key = initialKey
	let left = key.slice(0, 28)
	let right = key.slice(28)
	const test = []
	for (let i = 0; i < 16; i++) {
		const leftShifted = shiftKey(i, left)
		const rightShifted = shiftKey(i, right)
		left = leftShifted
		right = rightShifted

		const roundKey = compressKey(leftShifted.concat(rightShifted))

		keys.push(roundKey)
		// test.push([leftShifted.join(''), rightShifted.join('')])
	}
	// console.log('keys list', test);
	return keys
}

function substitute(blocks) {
	newBlocks = []
	for (let i = 0; i < 8; i++) {
		let a = `${blocks[i][0]}${blocks[i][5]}`
		let b = blocks[i].slice(1, 5).join('')
		a = parseInt(a, 2)
		b = parseInt(b, 2)
		newBlocks.push(CONFIG.substitutionBlocks[i][a * 16 + b].toString(2).padStart(4, 0))
	}
	return newBlocks
}

function makeChunks(m, n, length) {
	const chunks = []
	for (let i = 0; i < n; i++) {
		chunks.push(m.slice(i, i + length))
	}
	return chunks
}

function logMatrix(message, m) {
	console.log(message + ' matrix:', m.map((el, i) => `${el}-${i + 1}`));
	console.log('Matrix Length:', m.length);
	console.log();
}

function expandMatrix(m) {
	const res = new Array(48).fill(0)
	res.forEach((el, i) => {
		res[i] = m[CONFIG.expansionMatrix[i] - 1]
	})
	return res
}

function modSum(vector1, vector2) {
	return vector1.map((el, i) => (+el + +vector2[i]) % 2)
}

function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function binStr2hex(str) {
	// console.log('hex char', str, parseInt(str, 2).toString(16));
	const res = parseInt(str, 2).toString(16).toUpperCase()
	return res
}

function str2bin(str) {
	return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, 0)).join('')
}