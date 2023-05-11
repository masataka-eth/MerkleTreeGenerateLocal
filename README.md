# MerkleTree Generate Local for Sha3-256

## Why
Markle Tree must be created after the developer is responsible for reading the code!

## How to Use
After clone this repositry:
```
npm install
```

### Reserve
 - You must prepare your whitelist as a newline delimited list of text
 - File name should be "whitelist.txt"
 - Set in ".interface"folder

### Execute

```
cd yourDirectory
node index.js
```

Two files are created in the ".interface" folder
 - root.txt : MerkleRoot(write your contract)
 - proof.json : Proof information per wallet (use at mint site) 
'*proof.json is in a format that can be imported directly into Firestore'

### Add info
 - address + uint256_data1 : index1.js
 - address + uint256_data1 + uint256_data2 : index2.js
 - address + uint256_data1 + uint248_data2 : index2-1.js
 - address + uint248_data1 + uint248_data2 : index2-2.js
 - for hajime001 > mint-site-merke > allowlist : index_for-mint-site-merkle.js

That's all.