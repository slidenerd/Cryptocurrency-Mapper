<h1>Cryptocurrency Mapper</h1>
<b>Goals:</b> To map symbols between coinmarketcap and cryptocompare<br/>
<h3>Problem Definition</h3><br/>
<p>
Cryptocompare and Coinmarketcap offer an API where you can fetch prices and other relevant information.
<ol>
<li>Coinmarketcap distinguishes each coin with a unique ID. For example <b>BTC</b> has the id <i>bitcoin</i> Two different coins <b>Bytom</b> and <b>Bitmark</b> have the same symbol <b>BTM</b></li>
<li>Cryptocompare distinguises each coin with a unique symbol. In cases such as <b>Bytom</b> and <b>Bitmark</b> they offer add an <b>*</b> at the end of the symbol</li>
<li>For cryptocompare, Bitmark is <b>BTM</b> and Bytom is <b>BTM*</b></li>
<li>At the time of creating this repo, coinmarketcap does not offer OHLC data while cryptocompare does</li>
<li>The usual strategy then employed by a trading algorithms developer would be to fetch the list of symbols from coinmarketcap while fetching OHLC, historical and other relevant data from cryptocompare</li>
</ol>
</p>
<h3>Solution</h3>
<ol>
  <li>Get the unique list of symbols from coinmarketcap</li>
  <li><b>BTM</b> will appear only once in this list</li>
  <li>For each such symbol, find the symbol from cryptocompare after removing their differentiating <b>*</b> or any other such extra character</li>
  <li><b>BTM</b> which stands for Bitmark on cryptocompare and <b>BTM*</b> which stands for Bytom on cryptocompare will be mapped from the symbol <b>BTM</b> on coinmarketcap in the following structure</li>
  <code>
    BTM : [BTM, BTM*]
  </code>
  
  <code>
  
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
  </code>
</ol>
