class NOD {
	static find(a, b) {
		let nod
		do {
			const remain = a % b
			a = b
			b = remain
			nod = remain
		} while (b > 0);
		return a
	}	
}