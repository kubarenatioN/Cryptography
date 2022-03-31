class Sieve {
	static findPrimes(n) {
		const end = Math.round(Math.sqrt(n))
		const primes = new Array(n).fill(1, 2)
		for (let i = 2; i < n; i++) {
			if (primes[i] === 0) {
				continue
			}
			for (let j = i * 2; j < n; j += i) {
				primes[j] = 0
			}
		}
		
		return primes.reduce((n, el, i) => {
			if (primes[i] === 1) {
				n.push(i)
			}
			return n
		}, [])
	}
}