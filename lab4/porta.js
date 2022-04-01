class Porta {
	static alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż.,! "_'.split('') // pl

	static Encode(text) {
		const matrix = MatrixHelper.fromAlphabet(this.alphabet)
		const chars = this.formatInput(text)
		if (chars.length % 2) {
			chars.push(this.alphabet[0])
		}
		const width = chars.length
		const cipher = []
		for (let i = 0; i < width - 1; i += 2) {
			const row = this.alphabet.indexOf(chars[i])
			const col = this.alphabet.indexOf(chars[i + 1])
			cipher.push(matrix[row][col])
		}
		return cipher.join('')
	}

	static Decode(cipher) {
		const matrix = MatrixHelper.fromAlphabet(this.alphabet)
		const parts = this.split(cipher, 4)
		console.log(parts, cipher);
		const bigrams = []
		for (let i = 0; i < parts.length; i++) {
			for (let j = 0; j < matrix.length; j++) {
				const k = matrix[j].indexOf(parts[i])
				if (k !== -1) {
					bigrams.push(this.alphabet[j], this.alphabet[k])
				}
			}
		}
		return this.formatOutput(bigrams.join(''))
	}

	static split(cipher, chunkSize) {
		const parts = []
		for (let i = 0; i < cipher.length; i += chunkSize) {
			const chunk = cipher.slice(i, i + chunkSize);
			parts.push(chunk)
		}
		return parts
	}

	static formatInput(text) {
		return text
			.replaceAll('\n', '_')
			.toLocaleLowerCase()
			.split('')
	}
	
	static formatOutput(text) {
		return text
			.replaceAll('_', '\n')
			.toLocaleUpperCase()
	}
}