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

const config = {
    caesarKeys: [5, 3],
}

function defineEncoding() {
    const mode = modeSelect.value 
    if (mode === '0') {
        return {
            encryption: Caesar.Encode.bind(Caesar),
            payload: config.caesarKeys,
        }
    }
    return {
        encryption: Porta.Encode.bind(Porta),
        payload: [],
    }
}

function defineDecoding() {
    const mode = modeSelect.value 
    if (mode === '0') {
        return {
            decryption: Caesar.Decode.bind(Caesar),
            payload: config.caesarKeys,
        }
    }

    return {
        decryption: Porta.Decode.bind(Porta),
        payload: []
    }
}

encodeBtn.addEventListener('click', () => {
    const message = messageText.value
    const text = message

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
    
    const text = res
    
    decode.value = text
    console.log(`Decryption of ${text.length} symbols took ${endTime - startTime} ms.`);
    const stat = mapSymbols(cypher)
    console.log('cipher stat:', stat);
    decodeChart = drawHistogram(decodeChart, decodeCanvas, stat)
})