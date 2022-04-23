const { rotorsShift, reflector } = config
const outputText = document.getElementById('output')
const inputText = document.getElementById('input')

let cipherText = ''
let messageText = ''

window.addEventListener('keydown', (e) => {
	const { key, repeat } = e 
	if (repeat) return
	const buttonInput = inputKeys.find(b => b.dataset.letter === key.toLocaleUpperCase())
	if (buttonInput) {
		highlightInputButton(buttonInput)
		cipherLetter(buttonInput.dataset.letter)	
	}
})

function cipherLetter(letter) {
	// console.log('letter: ', letter);
	messageText += letter
	let c = forwardRotors([...rotorSelects].reverse(), rotors, letter, 3, true)
	// console.log('cipher forward:', c);
	c = reflect(c)
	// console.log('cipher reflect:', c);
	c = backwardRotors(rotorSelects, [...rotors].reverse(), c, 3, false)
	// console.log('cipher:', c);
	shiftRotors([...rotorSelects].reverse(), [...rotorsShift].reverse())
	highlightCipherLetter(c)
	cipherText += c
	outputText.textContent = cipherText
	inputText.textContent = messageText
	console.log('cipher', cipherText);
}

function processRotors(rotorsEl, rotors, letter, shift, isForward) {
	const { alphabet } = config
	let cipher = letter
	let chars = [...alphabet]
	rotorsEl.forEach((r, i) => {
		let rotorLetters
		if (isForward) {
			rotorLetters = rotors[i]
		} else {
			rotorLetters = resortArrays(chars, rotors[i])
		}
		const startLetter = getRotorActiveLetter(r)
		const rotorStartIndex = rotorLetters.indexOf(startLetter)
		const idx = chars.indexOf(cipher)
		const newIndex = (rotorStartIndex + idx) % N
		cipher = rotorLetters[newIndex]
	})
	return cipher
}

function forwardRotors(rotorsEl, rotors, letter) {
	const { alphabet } = config
	let cipher = letter
	let chars = [...alphabet]
	rotorsEl.forEach((r, i) => {
		const rotorLetters = rotors[i]
		const startLetter = getRotorActiveLetter(r)
		const rotorStartIndex = rotorLetters.indexOf(startLetter)
		const idx = chars.indexOf(cipher)
		const newIndex = (rotorStartIndex + idx) % N
		cipher = rotorLetters[newIndex]
	})
	return cipher
}

function backwardRotors(rotorsEl, rotors, letter) {
	const { alphabet } = config
	const chars = [...alphabet]
	let cipher = letter
	rotorsEl.forEach((r, i) => {
		let rotorLetters = rotors[i]
		const startLetter = getRotorActiveLetter(r)
		const rotorStartIndex = rotorLetters.indexOf(startLetter)

		if (rotorStartIndex > 0) {
			rotorLetters = [...rotorLetters.slice(rotorStartIndex), ...rotorLetters.slice(0, rotorStartIndex)]
		}
		rotorLetters = resortArrays(chars, rotorLetters)
		
		const idx = chars.indexOf(cipher)
		cipher = rotorLetters[idx]
	})
	return cipher
}

function shiftRotors(rotorsEl, rotorsShift) {
	rotorsEl.forEach((r, i) => {
		shiftRotor(rotorsEl, rotorsShift, i)
	})
}

function reflect(letter) {
	const pair = reflector.find(pair => pair.includes(letter))
	const index = pair.indexOf(letter)
	return pair[Math.abs(index - 1)]
}

function highlightCipherLetter(letter) {
	const btn = outputKeys.find(b => b.dataset.letter === letter)
	highlightOutputButton(btn)
}