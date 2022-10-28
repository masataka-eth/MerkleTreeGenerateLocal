const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const { buf2hex } = require('arrbuf2hex')
const fs = require('fs');
const csv = require('csv');

// read whitelist textdata
var text = "";
var saveaddress = new Array();
var saveint = new Array();
var saveint2 = new Array();
fs.createReadStream(".interface/whitelist.txt", 'utf-8')
.pipe(csv.parse(function(err, data) { 
    data.forEach(element => {
        saveaddress.push(element[0].toString().toLowerCase());
        saveint.push(element[1].toString());
        let hexcg = ('0000000000000000000000000000000000000000000000000000000000000000'
                     + Number(element[1]).toString(16)).slice(-64);
        saveint2.push(element[2].toString());
        let hexcg2 = ('0000000000000000000000000000000000000000000000000000000000000000'
                     + Number(element[2]).toString(16)).slice(-64);
        let unionstring = element[0] + hexcg +hexcg2;

        text += unionstring + '\n';
    });
    // node->byte
    let nodedata = text.split(/\r\n|\n/);
    nodedata = nodedata.filter(Boolean);    // delete space
    const leaves = nodedata.map(x => keccak256(x))
   
    //tree compute
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const hexroot = buf2hex(tree.getRoot())

    // make proof json file
    const LEAD_VAL = '{\"whitelist\": {';
    const LAST_VAL = '}}';
    let listdata = '';
    let listcnt = 0;
    nodedata.forEach(function(element){
        const id = element.toLowerCase();
        const leaf = keccak256(id)
        const hexproof = tree.getProof(leaf).map(x => buf2hex(x.data))
        proofdata = "";
        hexproof.forEach(function(proof){
            proofdata += '0x'+proof + ','
        });
        proofdata = proofdata.slice(0,-1);
        listdata += '\"' + saveaddress[listcnt] + '\"' + 
        ':{\"hexProof\":\"' +  proofdata + '\",' + 
            '\"count1\":' + saveint[listcnt] + ',' + 
            '\"count2\":' + saveint2[listcnt] +  '},'
        
        listcnt++;
    });
    listdata = listdata.slice(0,-1);
    const OutoputJson = LEAD_VAL + listdata + LAST_VAL;

    const createFile = (pathName, source) => {
    fs.writeFile(pathName, source, (err) => {
        if (err) rej(err);
        if (!err) {
        console.log('Generated file!');
        }
    });
    };
    createFile('.interface/proof.json', OutoputJson);
    createFile('.interface/root.txt', '0x' + hexroot);

}));