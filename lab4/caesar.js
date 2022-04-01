class Caesar {
	// static alphabet = 'abcdefghijklmnopqrstuvwxyz '.split('') // eng
	static alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż _.!,"'.split('') // pl
	static N = this.alphabet.length

	// direct function
	static fn(x, a, b, N) {
		return (a * x + b) % N
	}

	// inversed function
	static fnRev(y, a, b, N) {
		return GCD.findInverseNumberMod(a, N) * (y + N - b) % N
	}

	static Encode(text, a, b) {
		const chars = this.getIndices(text)
		const cipherChars = chars.map(c => {
			return {
				...c,
				i: this.fn(c.i, a, b, this.N)
			}
		})
		const cipher = cipherChars.map(c => {
			return {
				...c,
				char: this.alphabet[c.i]
			}
		})
		return cipher.map(c => c.char.toLocaleUpperCase()).join('')
	}

	static Decode(cipher, a, b) {
		const chars = this.getIndices(cipher)
		const reversedChars = chars
			.map(c => {
				return {
					...c,
					i: this.fnRev(c.i, a, b, this.N)
				}
			})
			.map(c => {
				return {
					...c,
					char: this.alphabet[c.i]
				}
			})
		return reversedChars.map(c => c.char)
			.join('')
			.toLocaleUpperCase()
			.replaceAll('_', '\n')
	}

	static getIndices(text) {
		return text
			.replaceAll('\n', '_')
			.toLocaleLowerCase()
			.split('')
			.map(char => {
				return {
					char,
					i: this.alphabet.indexOf(char)
				}
			})
	}
}