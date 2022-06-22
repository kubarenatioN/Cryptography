import {
	Decoder,
	Encoder,
  } from './merkle-hellman/out/index.js';
  
  const decoder = new Decoder();
  const encoder = new Encoder(decoder.publicKey);
  
  const message = 'Nikita Valerievich';
  
  const encodedMessage = encoder.encode(message);
  const decodedMessage = decoder.decode(encodedMessage);
  
  console.log(`Source message: ${message}`);
  console.log(`Encoded message: ${encodedMessage}`);
  console.log(`Decoded message: ${decodedMessage}`);