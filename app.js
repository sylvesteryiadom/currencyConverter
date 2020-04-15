const axios = require('axios');
// const fetch = require('fetch')

// const getExchangerate = (fromCurrency, toCurrency) => {
//     axios.get(`http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1`).then(response => {
//         const rate = response.data.rates;
//         const euro = 1 / rate[fromCurrency];
//         const exchangeRate = euro * rate[toCurrency];
//         console.log(exchangeRate.toFixed(5));

//     })
// }

// getExchangerate('USD', 'EUR');

async function getExchangerate(fromCurrency, toCurrency) {
    try {
        const result = await axios.get(`http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1`);
        rate = result.data.rates;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];

        return exchangeRate;
    } catch (error) {
        console.log(error);
    }
}

// getExchangerate('USD', 'EUR');

async function getCountries(toCurrency) {
    const countryRes = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
    countryRes.data.map(country => country.name);
}

getCountries('USD');