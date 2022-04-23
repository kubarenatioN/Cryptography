const inputKeyboard = document.getElementById('keyboard-input')
const outputKeyboard = document.getElementById('keyboard-output')
const inputKeys = []
const outputKeys = []
const rotorsContainer = document.getElementById('rotors')
const rotorSelects = []

const { letters, rotors } = config

createKeyboard('output', letters, outputKeyboard, outputKeys)
createKeyboard('input', letters, inputKeyboard, inputKeys)

setupRotors(rotors, rotorsContainer)

function createKeyboard(type, letters, container, buttonsList) {
	letters.forEach(row => {
		const keysRow = document.createElement('div')
		keysRow.classList.add('keys-row')
		row.forEach(l => {
			const key = document.createElement('button')
			key.classList.add(`key-${type}`)
			key.dataset.letter = l
			key.textContent = l
			keysRow.append(key)
			buttonsList.push(key)
		})
		container.append(keysRow)
	})
}

function highlightInputButton(button) {
	button.classList.add('highlight')
	setTimeout(() => {
		button.classList.remove('highlight')
	}, 200);
}

function highlightOutputButton(button) {
	button.classList.add('highlight')
	setTimeout(() => {
		button.classList.remove('highlight')
	}, 200);
}

function setupRotors(rotors, container) {
	[...rotors].reverse().forEach(r => {
		const wrapper = document.createElement('div')
		const btnUp = document.createElement('button')
		const btnDown = document.createElement('button')
		const rotorSelect = document.createElement('select')

		btnUp.textContent = 'Up'
		btnDown.textContent = 'Down'
		btnUp.dataset.step = '-1'
		btnDown.dataset.step = '1'

		r.forEach(letter => {
			const option = document.createElement('option')
			option.value = letter
			option.textContent = letter
			rotorSelect.append(option)
		})
		wrapper.append(btnUp, rotorSelect, btnDown)
		container.append(wrapper)
		rotorSelects.push(rotorSelect)

		Array.from([btnUp, btnDown]).forEach(b => {
			const { step } = b.dataset
			b.addEventListener('click', (e) => {
				shiftRotorByBtn(rotorSelect, step)
			})
		})
	})	
}

function getRotorActiveLetter(selectEl) {
	return [...selectEl.children].find(opt => opt.selected).value
}

function shiftRotor(rotors, shifts, i, value) {
	if (rotors.length < i + 1) {
		return
	}
	if (!value) {
		value = shifts[i]
	}
	const activeIndex = [...rotors[i].children].findIndex(c => c.selected)
	let newIndex = activeIndex + +value
	let isOverlap = false
	if (newIndex >= N) {
		isOverlap = true
	}
	const newActiveIndex = (newIndex % N + N) % N
	rotors[i].children[newActiveIndex].selected = true
	if (isOverlap) {
		shiftRotor(rotors, shifts, i + 1, 1)
	}
	return isOverlap
}

function shiftRotorByBtn(rotor, value) {
	const activeIndex = [...rotor.children].findIndex(c => c.selected)
	let newIndex = activeIndex + +value
	newIndex = (newIndex % N + N) % N
	rotor.children[newIndex].selected = true
}