const messageText = document.getElementById('message')
const encode = document.getElementById('encode-res')
const encodeBtn = document.getElementById('encode-btn')

const cypherText = document.getElementById('cypher')
const decode = document.getElementById('decode-res')
const decodeBtn = document.getElementById('decode-btn')

const encodeCanvas = document.getElementById('encode-chart').getContext('2d');
const decodeCanvas = document.getElementById('decode-chart').getContext('2d');
let encodeChart, decodeChart

const modeSelect = document.getElementById('mode')

const M = message

// const c = ZigZagTraverse.Encrypt(text)
// console.log(c);
// const m = ZigZagTraverse.Decrypt(c)
// console.log(m.replaceAll('%', '\n'));

const k1 = 'nick'
const k2 = 'marina'

const encoding = PermutationCipher.Encrypt('test hello world', k1, k2)
console.log(encoding);

const decoding = PermutationCipher.Decrypt('ehl ~~~~lrdosett~~~~ owl', k1, k2)
console.log(decoding);

function defineEncoding() {
    const mode = modeSelect.value 
    if (mode === '0') {
        return {
            encryption: ZigZagTraverse.Encrypt.bind(ZigZagTraverse),
            payload: [],
        }
    }
    return {
        encryption: PermutationCipher.Encrypt.bind(PermutationCipher),
        payload: [k1, k2],
    }
}

function defineDecoding() {
    const mode = modeSelect.value 
    if (mode === '0') {
        return {
            decryption: ZigZagTraverse.Decrypt.bind(ZigZagTraverse),
            payload: [],
        }
    }

    return {
        decryption: PermutationCipher.Decrypt.bind(PermutationCipher),
        payload: [k1, k2]
    }
}

encodeBtn.addEventListener('click', () => {
    const message = messageText.value
    const text = message.replaceAll('\n', '%')

    const { encryption, payload } = defineEncoding()
    const startTime = performance.now()
    const res = encryption(text, ...payload)
    const endTime = performance.now()
    
    encode.value = res
    console.log(`Encryption of ${text.length} symbols took ${endTime - startTime} ms.`);
    const stat = mapSymbols(text)
    console.log('message stat:', stat);
    encodeChart = drawHistogram(encodeChart, encodeCanvas, stat)
})

decodeBtn.addEventListener('click', () => {
    const cypher = cypherText.value

    const { decryption, payload } = defineDecoding()
    const startTime = performance.now()
    const res = decryption(cypher, ...payload)
    const endTime = performance.now()
    
    const text = res.replaceAll('%', '\n')
    
    decode.value = text
    console.log(`Decryption of ${text.length} symbols took ${endTime - startTime} ms.`);
    const stat = mapSymbols(cypher)
    console.log('cipher stat:', stat);
    decodeChart = drawHistogram(decodeChart, decodeCanvas, stat)
})

function mapSymbols(text) {
    const mapping = {}
    text.split('').forEach(char => {
        if (mapping[char] === undefined) {
            mapping[char] = 1
        } else {
            mapping[char] += 1
        }
    })
    return mapping
}

function drawHistogram(chartRef, canvas, data) {
    chartRef && chartRef.destroy()
    return drawChart(canvas, data)
}