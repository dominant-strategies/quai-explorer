const WebSocket = require('ws')
var url = 'ws://45.32.69.88/';
const chainSlugs = ['prime', 'region-1', 'region-2', 'region-3', 'zone-1-1', 'zone-1-2', 'zone-1-3', 'zone-2-1', 'zone-2-2', 'zone-2-3', 'zone-3-1', 'zone-3-2', 'zone-3-3'];

const subscribeData = {"id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
const subscribeHeader = async () => {
    connection = new WebSocket(url + 'zone-1-1-ws')

    connection.onmessage = function(e) {
      data = JSON.parse(e.data);
      if(data.params != undefined){
        console.log(data.params.result.number)
      }
      console.log('Message received from worker');
    };

    connection.onopen = function(error, ){
      console.log("Successfully connected to the echo websocket server...");
      connection.send(JSON.stringify(subscribeData)); 
    };

}
subscribeHeader();