const Web3 = require('Web3');
var url = 'http://45.32.69.88/';
const chainSlugs = ['prime', 'region-1', 'region-2', 'region-3', 'zone-1-1', 'zone-1-2', 'zone-1-3', 'zone-2-1', 'zone-2-2', 'zone-2-3', 'zone-3-1', 'zone-3-2', 'zone-3-3'];

const getTotal = async () => {
    var hashRate =0;
    for (let i=0; i < chainSlugs.length ; i++){
        var web3 = new Web3(url + chainSlugs[i] +'-http');
        hashRate += await web3.eth.getHashrate()
        console.log(hashRate);
        // console.log(await web3.eth.isMining())
    }
    console.log(hashRate);
}
getTotal();