'use strict';
const request = require('request');
const urlJoin = require('./url_join')

class CoinMarketCap {
    constructor(options = {}) {

        //Set the base url for coinmarketcap API
        this.baseUrl = options.baseUrl || 'https://api.coinmarketcap.com/'

        //Set the version 
        this.version = options.version || 'v1'
    }

    /**
     * Get the prices for all coins on coinmarketcap, set limit = 0 to explicitly get all results
     * @param {*fiat in which you want to fetch results, defaults to EUR} convert 
     */
    getTicker(convert, limit) {

        // https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0
        //Specify limit=0 to load all results
        //By default it only loads 100 results
        const options = {
            uri: urlJoin(this.baseUrl, this.version, 'ticker', `?convert=${convert}`, `&limit=${limit ? limit : '0'}`),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        }

        return fireRequest(options)
    }

    /**
     * Get details such as total market cap
     */
    getGlobalData() {

        const options = {
            uri: urlJoin(this.baseUrl, this.version, 'global'),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        }
        return fireRequest(options)
    }
}

function fireRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error) {
                if (response.statusCode === 200) {
                    resolve(JSON.parse(body))
                }
                else {
                    reject(error)
                }
            }
            else {
                reject(error)
            }
        })
    })
}

module.exports = CoinMarketCap