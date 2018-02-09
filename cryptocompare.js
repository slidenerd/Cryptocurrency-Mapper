'use strict'
/* global fetch */

const request = require('request')
const urlJoin = require('./url_join')

class CryptoCompare {
    constructor(options = {}) {

        //Set the base url for coinmarketcap API
        this.baseUrl = options.baseUrl || 'https://min-api.cryptocompare.com/data/'
        this.headers = {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    }

    query(endpoint, qs, options = {}) {
        if (options.extraParams)
            qs.extraParams = options.extraParams


        if (typeof options.sign === 'boolean')
            qs.sign = options.sign


        if (typeof options.tryConversion === 'boolean')
            qs.tryConversion = options.tryConversion


        const opts = {
            url: urlJoin(this.baseUrl, endpoint),
            method: 'GET',
            headers: this.headers,
            qs: qs
        }
        console.log(qs)
        return fireRequest(opts)
    }

    coinlist() {
        const opts = {
            url: urlJoin('https://www.cryptocompare.com', 'api', 'data', 'coinlist'),
            method: 'GET',
            headers: this.headers
        }
        return fireRequest(opts)
    }

    price(fsym, tsyms, options = {}) {
        const qs = { fsym, tsyms }

        if (options.exchange)
            qs.e = options.exchange


        return this.query('price', qs, options)
    }

    priceMulti(fsyms, tsyms, options = {}) {
        const qs = { fsyms, tsyms }

        if (options.exchange)
            qs.e = options.exchange


        return this.query('pricemulti', qs, options)
    }

    priceFull(fsyms, tsyms, options = {}) {
        const qs = { fsyms, tsyms }

        if (options.exchange)
            qs.e = options.exchange

        return this.query('pricemultifull', qs, options)
    }

    generateAvg(fsym, tsym, options = {}) {

        const qs = { fsym, tsym }

        if (options.markets)
            qs.e = options.markets


        return this.query('generateAvg', qs, options)
    }

    dayAvg(fsym, tsym, options = {}) {

        const qs = { fsym, tsym }

        if (options.exchange)
            qs.e = options.exchange

        if (options.avgType)
            qs.avgType = options.avgType

        if (options.utcHourDiff)
            qs.UTCHourDiff = options.utcHourDiff

        if (options.date)
            qs.toTs = this.dateToTimestamp(options.date)

        return this.query('dayAvg', qs, options)
    }

    priceHistorical(fsym, tsyms, options = {}) {
        const qs = { fsym, tsyms }

        if (options.markets)
            qs.markets = options.markets


        if (options.date)
            qs.ts = this.dateToTimestamp(options.date)


        return this.query('pricehistorical', qs, options)
    }

    histoMinute(fsym, tsym, options = {}) {
        const qs = { fsym, tsym }

        if (options.exchange)
            qs.e = options.exchange

        if (options.aggregate)
            qs.aggregate = options.aggregate


        if (options.limit)
            qs.limit = options.limit


        if (options.date)
            qs.toTs = this.dateToTimestamp(options.date)

        return this.query('histominute', qs, options)
    }

    histoHour(fsym, tsym, options = {}) {

        const qs = { fsym, tsym }

        if (options.exchange)
            qs.e = options.exchange

        if (options.aggregate)
            qs.aggregate = options.aggregate


        if (options.limit)
            qs.limit = options.limit


        if (options.date)
            qs.toTs = this.dateToTimestamp(options.date)

        return this.query('histohour', qs, options)
    }

    histoDay(fsym, tsym, options = {}) {

        const qs = { fsym, tsym }

        if (options.exchange)
            qs.e = options.exchange

        if (options.aggregate)
            qs.aggregate = options.aggregate

        if (options.limit)
            qs.limit = options.limit

        if (options.date)
            qs.toTs = this.dateToTimestamp(options.date)

        if (options.allData)
            qs.allData = options.allData

        return this.query('histoday', qs, options)
    }

    topPairs(fsym, tsym, options = {}) {

        const qs = { fsym, tsym }

        if (options.limit)
            qs.limit = options.limit

        if (typeof options.sign === 'boolean')
            qs.sign = options.sign

        const opts = {
            url: urlJoin(this.baseUrl, 'top', 'pairs'),
            method: 'GET',
            headers: this.headers,
            qs: qs
        }

        return fireRequest(opts)
    }

    dateToTimestamp(date) {
        if (!(date instanceof Date)) throw new Error('timestamp must be an instance of Date.')
        return Math.floor(date.getTime() / 1000)
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

module.exports = CryptoCompare

// new CryptoCompare().coinlist().then(JSON.stringify).then(console.log).catch(console.log)