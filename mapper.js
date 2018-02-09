let cryptocompare = require('./ccp')
let coinmarketcap = require('./coins')


function mapCMCToCPC(coinmarketcap, cryptocompare){
	//Convert an object with keys into an array of objects
	cryptocompare = Object.keys(cryptocompare['Data']).map(i=>cryptocompare['Data'][i])

	let ignoreSpaceRegex = /\s/g, nonAlphaNumericRegex = /\W+/g
	let map = {}, symbol1, name1, symbol2, name2, reduced

	//Loop through every item in coinmarketcap
	//Note that symbols such as BTM, KNC will be repeated multiple times
	for(let i = coinmarketcap.length - 1; i >= 0; i--){

		//Get the symbol of the current coin on coinmarketcap
		symbol1 = coinmarketcap[i].symbol

		//Get the name of the current coin on coinmarketcap
		//Remove all spaces from the name
		//Trim the name on both sides
		//Convert the name to lower case
		name1 = coinmarketcap[i].name.trim().replace(ignoreSpaceRegex, "").toLowerCase()

		// if(coinmarketcap[i].rank < 700){
		//Loop through every item on cryptocompare
		for(let j = cryptocompare.length - 1;  j >= 0; j--){

			//Get the symbol of the current coin on cryptocompare
			symbol2 = cryptocompare[j].Symbol

			//Cryptocompare has unique symbols at all times
			//A coin such as KNC appears twice on coinmarketcap as King N Coin and Kyber
			//Both coins have the same symbol on coinmarketcap
			//The same coins however are stored with a unique symbol on cryptocompare
			//KNC, KNC*, KNC** represent Kyber, Khancoin and King N Coin on cryptocompare
			//Coins such as B@ represent BankCoin
			//Take a symbol on cryptocompare
			//Remove special characters such as * or @
			//Check if the reduced symbol on cryptocompare matches with some symbol on coinmarketcap
			//KNC, KNC*, KNC** will be reduced to KNC from cryptocompare
			//These 3 symbols will match with KNC from coinmarketcap
			//If we find a match either via reduced symbols or via names
			//Set the key as the coinmarketcap symbol
			//Set the values as a unique array of cryptocompare symbols prior to reduction
			//KNC on coinmarketcap => KNC, KNC*, KNC** on cryptocompare after mapping

			reduced = symbol2.replace(nonAlphaNumericRegex,"")
			name2 = cryptocompare[j].CoinName.trim().replace(ignoreSpaceRegex, "").toLowerCase()	
			if(symbol1 === reduced || name1 === name2){

				//Check if the map has the symbol from coinmarketcap
				if(!map[symbol1]){
					map[symbol1] = []
				}

				//Push the cryptocompare key only if it was not pushed previously
				if(map[symbol1].indexOf(symbol2) < 0){
					map[symbol1].push(symbol2)	
				}
			}
		}
		// }

	}

	return map
}


let items = mapCMCToCPC(coinmarketcap, cryptocompare)
let keys = Object.keys(items)
let cp = []
for(var i = 0, length = keys.length; i < length; i++){
	cp.push(...items[keys[i]])
}

var fs = require('fs')
fs.writeFile('test.json', JSON.stringify(cp))

