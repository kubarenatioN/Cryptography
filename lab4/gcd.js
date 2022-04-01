class GCD {
	static calcGCD(a, b) {
		const quotients = []
		let q = a % b
		if (q === 0) {
			return b
		}
		let gcd
		while (q > 0) {
			const remainder = a % b
			a = b
			b = remainder
			q = remainder
			gcd = a
			quotients.push(Math.trunc(a / b))
		}
		return { gcd, quotients: quotients.slice(0, -2) }
	}

	static findInverseNumberMod(a, N) {
		const { gcd, quotients } = GCD.calcGCD(a, N)
		if (gcd !== 1) {
			return null
		}
		let p0 = 0
		let p1 = 1
		let p2
		for (let i = 0; i < quotients.length; i++) {
			p2 = ((p0 - p1 * quotients[i]) % N + N) % N
			p0 = p1
			p1 = p2
		}
		return p2
	}
}