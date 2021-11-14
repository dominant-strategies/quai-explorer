const Web3 = require('Web3');
const axios = require("axios");
var url = 'http://45.32.69.88/';
const chainSlugs = ['prime', 'region-1', 'region-2', 'region-3', 'zone-1-1', 'zone-1-2', 'zone-1-3', 'zone-2-1', 'zone-2-2', 'zone-2-3', 'zone-3-1', 'zone-3-2', 'zone-3-3'];

const updateLatestBlockNum = async () => {
    var blocks = 0
    for (let i=0; i < chainSlugs.length ; i++){
        var web3 = new Web3(url + chainSlugs[i] +'-http');
        blocks += await web3.eth.getBlockNumber()
    }
    console.log(blocks)
}

const get = async () => {
    var data = {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}
    
    axios
        .post(
          'http://45.32.69.88/' + 'prime' + '-http',
          {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .then(function (response) {
          console.log(parseInt(response.data.result, 16))
        })
        .catch(function (error) {
          console.log(error)
        })
}
