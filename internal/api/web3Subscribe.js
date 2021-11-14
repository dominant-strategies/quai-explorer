const Web3 = require('Web3')
const sub = async () => {
var web3 = new Web3('ws://45.32.69.88/zone-1-1-ws')

var subscription = await web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log(result);

        return;
    }

    console.error(error);
})
.on("connected", function(subscriptionId){
    console.log("subscriptionId", subscriptionId);
})
.on("data", function(blockHeader){
    console.log("blockHeader", blockHeader);
})
.on("error", function(error){
	try {
		console.log(error);
	}
	catch {
		console.log(error);
	}
});

console.log(subscription);
}
sub();