class PermutationCipher {
    static undefPlaceholder = '~'
    static Encrypt(text, key1, key2) {
        const width = key1.length
        const height = key2.length
        const chars = text.split('')
        let matrix = MatrixHelper.fromKeys(key1, key2)

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                matrix[i][j] = chars[width * i + j] || this.undefPlaceholder
            }
        }

        let emptyMatrix = MatrixHelper.fromKeys(key1, key2)
        console.log(matrix);
        matrix = this.sortColumns(
            matrix,
            key1,
            emptyMatrix,
            this.createDirectMapping(key1),   
        )
        console.log(matrix);
        emptyMatrix = MatrixHelper.fromKeys(key1, key2)
        matrix = this.sortRows(
            matrix, 
            key2, 
            emptyMatrix,
            this.createDirectMapping(key2),
        )
        console.log(matrix);
        return matrix.flat().join('')
    }

    static Decrypt(text, key1, key2) {
        const width = key1.length
        const height = key2.length
        const chars = text.split('')
        let matrix = MatrixHelper.fromKeys(key1, key2)

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                matrix[i][j] = chars[width * i + j] || this.undefPlaceholder
            }
        }

        let emptyMatrix = MatrixHelper.fromKeys(key1, key2)
        console.log(matrix);
        matrix = this.sortRows(
            matrix, 
            key2, 
            emptyMatrix,
            this.createReversedMapping(key2),
        )
        console.log(matrix);
        emptyMatrix = MatrixHelper.fromKeys(key1, key2)
        matrix = this.sortColumns(
            matrix,
            key1,
            emptyMatrix,
            this.createReversedMapping(key1),   
        )
        console.log(matrix);
        return matrix.flat().filter(el => el !== '~').join('')
    }

    static sortColumns(matrix, key, newMatrix, keymap) {
        for (let j = 0; j < key.length; j++) {            
            const fromCol = keymap[j]['index']
            for (let i = 0; i < newMatrix.length; i++) {
                newMatrix[i][j] = matrix[i][fromCol]
            }
        }

        return newMatrix
    }

    static sortRows(matrix, key, newMatrix, keymap) {
        for (let i = 0; i < key.length; i++) {
            const fromRow = keymap[i]['index']
            for (let j = 0; j < newMatrix[0].length; j++) {
                newMatrix[i][j] = matrix[fromRow][j]
            }
        }

        return newMatrix
    }

    static createDirectMapping(key) {
        return key
            .split('')
            .map((char, i) => {
                return {
                    char,
                    index: i,
                }
            })
            .sort((a, b) => a.char.localeCompare(b.char))
    }

    static createReversedMapping(key) {
        const chars = key.split('')
        const sorted = chars
            .sort((a, b) => a.localeCompare(b))
            .map((char, i) => {
                const idx = chars.findIndex(el => el === char)
                chars[idx] = undefined
                return {
                    char,
                    index: idx,
                }
            })

        const res = key.split('').map((c, i) => {
            const idx = sorted.findIndex(el => el && el.char === c)
            sorted[idx] = undefined
            return {
                char: c,
                index: idx
            }
        })
        
        return res
    }
}