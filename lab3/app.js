const nodRes = document.getElementById('nod-res')
const nodCalcBtn = document.getElementById('nod-calc')
const nodNumbers = document.querySelectorAll('.nod-number')

const eratRes = document.getElementById('erat-res')
const eratCalcBtn = document.getElementById('erat-calc')
const eratNumbers = document.querySelectorAll('.interval-input')

nodCalcBtn.addEventListener('click', () => {
	numbers = Array.from(nodNumbers).map(input => +input.value).filter(val => val)
	const nod = calcNod(numbers)	
	nodRes.value = nod;
})

eratCalcBtn.addEventListener('click', () => {
	numbers = Array.from(eratNumbers).map(input => +input.value)
	const n = calcErat(...numbers)
	eratRes.innerText = n;
	const nearly = numbers[1]/Math.log(numbers[1])
	console.log(`About ${nearly} primes`);
})

function calcNod(numbers) {
	let nod = NOD.find(numbers[0], numbers[1])
	for (let i = 2; i < numbers.length; i++) {
		nod = NOD.find(nod, numbers[i])
	}
	return nod
}

function calcErat(n1, n2) {
	const k2 = Sieve.findPrimes(n2).length
	const k1 = Sieve.findPrimes(n1).length
	return k2 - k1
}