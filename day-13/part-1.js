const TransparentOrigamiFolder = require('./transparent-origami-folder.js');
const transparentOrigamiFolder = new TransparentOrigamiFolder();
transparentOrigamiFolder.loadInput('input.txt');
transparentOrigamiFolder.processFoldInstruction(transparentOrigamiFolder.foldInstructionList[0]);

console.log(transparentOrigamiFolder.countVisibleDots());
