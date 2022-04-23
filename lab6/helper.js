function resortArrays(sorted, arr) {
	const indices = arr.map(el => {
		return {
			char: el,
			index: arr.indexOf(el)
		}
	}).sort((a, b) => a.char.localeCompare(b.char)).map(o => o.index)
	const resorted = []
	for (let i = 0; i < sorted.length; i++) {
		resorted[i] = sorted[indices[i]]
	}
	return resorted
}