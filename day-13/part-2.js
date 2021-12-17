const TransparentOrigamiFolder = require('./transparent-origami-folder.js');
const transparentOrigamiFolder = new TransparentOrigamiFolder();
transparentOrigamiFolder.loadInput('input.txt');
transparentOrigamiFolder.processAllFoldingInstructions();

console.log(transparentOrigamiFolder.getPaperAsString());
