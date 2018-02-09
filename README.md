<h1>Cryptocurrency Mapper</h1>
<b>Goals:</b> To map symbols between coinmarketcap and cryptocompare
<b>Problem Definition</b>
<p>
Cryptocompare and Coinmarketcap offer an API where you can fetch prices and other relevant information.
<ol>
<li>Coinmarketcap distinguishes each coin with a unique ID. For example <b>BTC</b> has the id <i>bitcoin</i> Two different coins <b>Bytom</b> and <b>Bitmark</b> have the same symbol <b>BTM</b></li>
<li>Cryptocompare distinguises each coin with a unique symbol. In cases such as <b>Bytom</b> and <b>Bitmark</b> they offer add an <b>*</b> at the end of the symbol</li>
<li>For cryptocompare, Bitmark is <b>BTM</b> and Bytom is <b>BTM*</b></li>
<li>At the time of creating this repo, coinmarketcap does not offer OHLC data while cryptocompare does</li>
<li>The usual strategy then employed by a trading algorithms developer would be to fetch the list of symbols from coinmarketcap while fetching OHLC, historical and other relevant data from cryptocompare</li>
<li></li>
</ol>
</p>
