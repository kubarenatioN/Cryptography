// const rotorL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// const rotorM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// const rotorR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const rotorL = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ'
const rotorM = 'AJDKSIRUXBLHWTMCQGZNPYFVOE'
const rotorR = 'BDFHJLCPRTXVZNYEIWGAKMUSQO'
// const rotorL = 'LEYJVCNIXWPBQMDRTAKZGFUHOS'
// const rotorM = 'FKQHTLXOCBJSPDZRAMEWNIUYGV'
// const rotorR = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ'

const N = 26

const config = {
	alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	letters: [
		'qwertzuio',
		'asdfghjk',
		'pyxcvbnml',
	].map(row => row.toLocaleUpperCase().split('')),
	rotors: [
		rotorR,
		rotorM,
		rotorL,
	].map(rotor => rotor.split('')),
	rotorsShift: [1, 1, 5],
	reflector: ['AY', 'BR', 'CU', 'DH', 'EQ', 'FS', 'GL', 'IP', 'JX', 'KN', 'MO', 'TZ', 'VW'],
	// reflector: ['AE', 'BN', 'CK', 'DQ', 'FU', 'GY', 'HW', 'IJ', 'LO', 'MP', 'RX', 'SZ', 'TV'],
}