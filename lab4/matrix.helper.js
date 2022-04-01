class MatrixHelper {
    static fromArray(arr) {
        const matrix = []
        const l = arr.length
        const width = Math.ceil(Math.sqrt(l))
        const height = Math.ceil(l / width)
        console.log(l, width, height);
        for (let i = 0; i < height; i++) {
            const row = []
            for (let j = 0; j < width; j++) {
                row.push(arr[i * width + j] || '')
            }
            matrix.push(row)
        }
        return matrix
    }

    static emptyMatrix(length) {
        const width = Math.ceil(Math.sqrt(length))
        const height = Math.ceil(length / width)
        const size = width * height
        const empty = new Array(height).fill(new Array(width))
        return { empty, size }
    }

    static fromKeys(k1, k2) {
        return new Array(k2.length).fill().map(() => new Array(k1.length).fill())
    }

    static fromAlphabet(alphabet) {
        const size = alphabet.length
        const m = []
        for (let i = 0; i < size; i++) {
            const row = []
            for (let j = 1; j <= size; j++) {
                row.push(`${i * size + j}`.padStart(4, 0))
            }
            m.push(row)
        }
        return m
    }
}