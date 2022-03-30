class ZigZagTraverse {

    res = []

    direction

    static placeholder = '~'

    static addDiagonal(diagonal) {
        if (this.direction === 'up') {
            this.res.push(...diagonal)
            this.direction = 'down'
        } else {
            this.res.push(...diagonal.reverse())
            this.direction = 'up'
        }
    }

    static traverse(matrix, arr) {
        const width = matrix[0].length
        this.direction = 'up'
        this.res = []

        for (let i = 0; i < matrix.length; i++) {
            const diagonal = []
            for (let j = 0, k = i; k >= 0 && j < width; j++, k--) {
                diagonal.push(arr[width * k + j] || ZigZagTraverse.placeholder)
            }
            this.addDiagonal(diagonal)
        }
    
        for (let i = 1; i < width; i++) {
            const diagonal = []
            for (let j = i, k = matrix.length - 1; k >= 0 && j < width; j++, k--) {
                diagonal.push(arr[width * k + j] || ZigZagTraverse.placeholder)
            }
            this.addDiagonal(diagonal)
        }
        // console.log(this.res);
        return this.res
    }

    static Encrypt(text) {
        const chars = text.split('')
        const { empty } = MatrixHelper.emptyMatrix(chars.length)
        // const parts = []
        // for (let i = 0; i < empty.length; i++) {
        //     parts.push(chars.slice(empty[0].length * i, empty[0].length * (i + 1)))
        // }
        // console.log(parts);
        const encrypt = this.traverse(empty, chars)
        return encrypt.join('')
    }

    static Decrypt(cypher) {
        let chars = cypher.split('')
        const { empty, size } = MatrixHelper.emptyMatrix(chars.length)
        // for (let i = chars.length; i < size; i++) {
        //     chars.push(undefined)
        // }

        // const parts = []
        // for (let i = 0; i < empty.length; i++) {
        //     parts.push(chars.slice(empty[0].length * i, empty[0].length * (i + 1)))
        // }
        // console.log(parts);

        const width = empty[0].length
        const m = []
        let t = 0

        this.direction = 'up'
        for (let i = 0; i < empty.length; i++) {
            m.push([])
            if (this.direction === 'up') {
                for (let j = 0, k = i; k >= 0 && j < width; j++, k--) {
                    m[k][j] = chars[t]
                    t++
                }
                this.direction = 'down'
            } else {
                for (let j = 0, k = i; k >= 0 && j < width; j++, k--) {
                    m[j][k] = chars[t]
                    t++
                }
                this.direction = 'up'
            }
        }

        if (width > empty.length) {
            if (this.direction === 'up') {
                for (let j = 1, k = empty.length - 1; j < width; j++, k--) {
                    m[k][j] = chars[t]
                    t++
                }
                this.direction = 'down'
            } else {
                for (let j = 0, k = width - 1; j < empty.length; j++, k--) {
                    m[j][k] = chars[t]
                    t++
                }
                this.direction = 'up'
            }
        }

        // console.log(m);

        const start = width > empty.length ? 2 : 1

        for (let i = start; i < width; i++) {
            if (this.direction === 'up') {
                for (let j = i, k = empty.length - 1; j < width && k >= 0; j++, k--) {
                    m[k][j] = chars[t]
                    t++
                }
                this.direction = 'down'
            } else {
                for (let j = width - 1, k = 1 + i - start; k < empty.length; j--, k++) {
                    m[k][j] = chars[t]
                    t++
                }
                this.direction = 'up'
            }
        }

        return m.flat().filter(c => c !== this.placeholder).join('')
    }    
}