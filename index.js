const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const { buf2hex } = require('arrbuf2hex')
const fs = require('fs');

// read whitelist textdata
const text = fs.readFileSync(".interface/whitelist.txt", 'utf-8');

// node->byte
let nodedata = text.split(/\r\n|\n/);
nodedata = nodedata.filter(Boolean);    // delete space
const leaves = nodedata.map(x => keccak256(x))

console.log(nodedata);

// tree compute
// const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
// const hexroot = buf2hex(tree.getRoot())

// // make proof json file
// const LEAD_VAL = '{\"whitelist\": {';
// const LAST_VAL = '}}';
// let listdata = '';
// nodedata.forEach(function(element){
//     const id = element.toLowerCase();
//     const leaf = keccak256(id)
//     const hexproof = tree.getProof(leaf).map(x => buf2hex(x.data))
//     proofdata = "";
//     hexproof.forEach(function(proof){
//         proofdata += '0x'+proof + ','
//     });
//     proofdata = proofdata.slice(0,-1);
//     listdata += '\"' + id + '\"' + ':{\"hexProof\":\"' +  proofdata + '\"},'
// });
// listdata = listdata.slice(0,-1);
// const OutoputJson = LEAD_VAL + listdata + LAST_VAL;

// const createFile = (pathName, source) => {
// fs.writeFile(pathName, source, (err) => {
//     if (err) rej(err);
//     if (!err) {
//     console.log('Generated file!');
//     }
// });
// };
// createFile('.interface/proof.json', OutoputJson);
// createFile('.interface/root.txt', '0x' + hexroot);