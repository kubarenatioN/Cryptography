const CONFIG = {
	// Initial Permutation Table
	IP: [
		58, 50, 42, 34, 26, 18,
		10, 2, 60, 52, 44, 36, 28, 20,
		12, 4, 62, 54, 46, 38,
		30, 22, 14, 6, 64, 56,
		48, 40, 32, 24, 16, 8,
		57, 49, 41, 33, 25, 17,
		9, 1, 59, 51, 43, 35, 27,
		19, 11, 3, 61, 53, 45,
		37, 29, 21, 13, 5, 63, 55,
		47, 39, 31, 23, 15, 7
	],
	// Inverse Initial Permutation Table
	IP1: [
		40, 8, 48, 16, 56, 24, 64,
		32, 39, 7, 47, 15, 55,
		23, 63, 31, 38, 6, 46,
		14, 54, 22, 62, 30, 37,
		5, 45, 13, 53, 21, 61,
		29, 36, 4, 44, 12, 52,
		20, 60, 28, 35, 3, 43,
		11, 51, 19, 59, 27, 34,
		2, 42, 10, 50, 18, 58,
		26, 33, 1, 41, 9, 49,
		17, 57, 25
	],
	// first key-hePermutation Table
	PC1: [
		57, 49, 41, 33, 25,
		17, 9, 1, 58, 50, 42, 34, 26,
		18, 10, 2, 59, 51, 43, 35, 27,
		19, 11, 3, 60, 52, 44, 36, 63,
		55, 47, 39, 31, 23, 15, 7, 62,
		54, 46, 38, 30, 22, 14, 6, 61,
		53, 45, 37, 29, 21, 13, 5, 28,
		20, 12, 4
	],
	// second key permutation
	PC2: [
		14, 17, 11, 24, 1, 5, 3,
		28, 15, 6, 21, 10, 23, 19, 12,
		4, 26, 8, 16, 7, 27, 20, 13, 2,
		41, 52, 31, 37, 47, 55, 30, 40,
		51, 45, 33, 48, 44, 49, 39, 56,
		34, 53, 46, 42, 50, 36, 29, 32
	],
	// Expansion D-box Table
	EP: [
		32, 1, 2, 3, 4, 5, 4,
		5, 6, 7, 8, 9, 8, 9, 10,
		11, 12, 13, 12, 13, 14, 15,
		16, 17, 16, 17, 18, 19, 20,
		21, 20, 21, 22, 23, 24, 25,
		24, 25, 26, 27, 28, 29, 28,
		29, 30, 31, 32, 1
	],
	// Straight Permutation Table
	P: [
		16, 7, 20, 21, 29, 12, 28,
		17, 1, 15, 23, 26, 5, 18,
		31, 10, 2, 8, 24, 14, 32,
		27, 3, 9, 19, 13, 30, 6,
		22, 11, 4, 25
	],
	sBox: [
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
	keyShifts: [
		1, 1, 2, 2, 2, 2, 2, 2,
		1, 2, 2, 2, 2, 2, 2, 1
	],
	keyCompression: [9, 18, 22, 25, 35, 38, 43, 54],
	keys: []
}

function hexStrToBinStr(hex) {
	let n = hex.length / 2
	// console.log(n);
	let output = ''
	for (let i = 0; i < n; i++) {
		const hexChar = hex.substring(i * 2, (i + 1) * 2)
		output += hex2bin(hexChar)
	}
	return output
}

function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function bin2hex(str) {
	// console.log('hex char', str, parseInt(str, 2).toString(16));
	const res = parseInt(str, 2).toString(16).toUpperCase()
	return res
}

// function hexToBin(input) {
// 	const n = input.length * 4;
// 	input = Long.toBinaryString(
// 		Long.parseUnsignedLong(input, 16));
// 	while (input.length < n)
// 		input = "0" + input;
// 	return input;
// }

function permutation(sequence, input) {
	let output = ''
	input = hexStrToBinStr(input)
	// console.log('input', input);
	for (let i = 0; i < sequence.length; i++) {
		output += input.charAt(sequence[i] - 1)
	}

	output = bin2hex(output)
	// console.log('output', output);
	return output
}

function modSum(vector1, vector2) {
	const res = vector1.map((el, i) => (+el + +vector2[i]) % 2)
	return res
}

function leftCircularShift(input, numBits) {
	const n = input.length * 4;
	const perm = []
	for (let i = 0; i < n - 1; i++) {
		perm[i] = i + 2
	}
	perm[n - 1] = 1
	while(numBits-- > 0) {
		input = permutation(perm, input)
	}
	return input
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
	let key = hexStrToBinStr(initialKey)
	// console.log(key);
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

// 16 keys set
function getKeys(key) {
	const keys = []
	key = permutation(CONFIG.PC1, key)
	// key = hexStrToBinStr(key)
	console.log('key', key);
	for (let i = 0; i < 16; i++) {
		key = leftCircularShift(hexStrToBinStr(key.slice(0, 7)), CONFIG.keyShifts[i]) + leftCircularShift(hexStrToBinStr(key.slice(7)), CONFIG.keyShifts[i])
		keys[i] = permutation(CONFIG.PC2, key)
	}
	return keys
}

function sBox(input) {
	let output = ''
	for (let i = 0; i < 48; i += 6) {
		temp = input.substring(i, i + 6)
		// console.log('part ________________________', temp);
		const index = i / 6
		let a = `${temp[0]}${temp[5]}`
		let b = temp.substring(1, 5)
		a = parseInt(a, 2)
		b = parseInt(b, 2)
		// console.log(a, b);
		const binaryNum = CONFIG.sBox[index][a * 16 + b].toString(2).padStart(4, '0')
		output += binaryNum	
	}
	return output
}

function round(input, key) {
	let left = input.substring(0, 8)
	let temp = input.substring(8)
	let right = temp

	temp = permutation(CONFIG.EP, temp)
	temp = hexStrToBinStr(temp)

	temp = modSum(temp.split(''), key.split(''))
	// console.log('temp1 +++++++++++++++++++++++++++++++++++', temp);
	temp = sBox(temp.join(''))
	// console.log('temp2', temp);
	temp = permutation(CONFIG.P, bin2hex(temp))
	// console.log('temp3', temp, key);
	left = modSum(hexStrToBinStr(temp).split(''), key.split(''))
	// console.log(bin2hex(left.join('')), right);
	return right + bin2hex(left.join(''))
}

function Encode(text, key) {
	const keys = createKeysList(key).map(k => k.join(''))
	// console.log(keys);

	text = permutation(CONFIG.IP, text)
	console.log('initial perm           ', text);
	for (let i = 0; i < 16; i++) {
		// console.log('text', text);	
		text = round(text, keys[i], i)
	}
	console.log('after S Box           ', text);

	text = text.substring(8) + text.substring(0, 8)

	console.log('swap                ', text);

	text = permutation(CONFIG.IP1, text)

	console.log('final perm          ', text);

	return text
}

function Decode(text, key) {
	const keys = createKeysList(key).map(k => k.join(''))
	// console.log(keys);

	text = permutation(CONFIG.IP, text)
	console.log('initial perm           ', text);
	
	for (i = 15; i > -1; i--) {
		text = round(text, keys[i], i)
	}

	console.log('after S Box           ', text);

	text = text.substring(8) + text.substring(0, 8)

	console.log('swap                ', text);

	text = permutation(CONFIG.IP1, text)

	console.log('final perm          ', text);

	return text
}

const text = '123456ABCD132536'
const key = 'AABB09182736CCDD'

const cipher = Encode(text, key)

console.log('cipher:', cipher)

const decode = Decode('D7E8269614DDB000', key)

console.log('decoding', decode);


// class Main {
// 	private static class DES {

// 		String decrypt(String plainText, String key)
// 		{
// 			int i;
// 			// get round keys
// 			String keys[] = getKeys(key);

// 			// initial permutation
// 			plainText = permutation(IP, plainText);
// 			System.out.println(
// 				"After initial permutation: "
// 				+ plainText.toUpperCase());
// 			System.out.println(
// 				"After splitting: L0="
// 				+ plainText.substring(0, 8).toUpperCase()
// 				+ " R0=" + plainText.substring(8, 16).toUpperCase()
// 				+ "\n");

// 			// 16-rounds
// 			for (i = 15; i > -1; i--) {
// 				plainText = round(plainText, keys[i], 15 - i);
// 			}

// 			// 32-bit swap
// 			plainText = plainText.substring(8, 16)
// 						+ plainText.substring(0, 8);
// 			plainText = permutation(IP1, plainText);
// 			return plainText;
// 		}
// 	}
// 	public static void main(String args[])
// 	{
// 		String text = "123456ABCD132536";
// 		String key = "AABB09182736CCDD";

// 		DES cipher = new DES();
// 		System.out.println("Encryption:\n");
// 		text = cipher.encrypt(text, key);
// 		System.out.println(
// 			"\nCipher Text: " + text.toUpperCase() + "\n");
// 		System.out.println("Decryption\n");
// 		text = cipher.decrypt(text, key);
// 		System.out.println(
// 			"\nPlain Text: "
// 			+ text.toUpperCase());
// 	}
// }
