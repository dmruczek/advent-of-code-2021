const SubmarineDisplayDecoder = require('./submarine-display-decoder.js');
const submarineDisplayDecoder = new SubmarineDisplayDecoder();
submarineDisplayDecoder.loadInput('input.txt');

console.log(submarineDisplayDecoder.decodeAllDisplaysAndSumValues());