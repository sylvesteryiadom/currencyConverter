const axios = require('axios');

async function getExchangerate(fromCurrency, toCurrency) {
    const result = await axios.get(`http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1`);
    rate = result.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }

    return exchangeRate;


}

// getExchangerate('USD', 'EUR');

async function getCountries(toCurrency) {
    try {
        const countries = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
        return countries.data.map(country => country.name);

    } catch (error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    }

}

// getCountries('USD');


async function convertCurrency(fromCurrency, toCurrency, amount) {
    const exchangeRate = await getExchangerate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(3);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USDDD', 'EUR', 30)
    .then(results => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error.message)
    });