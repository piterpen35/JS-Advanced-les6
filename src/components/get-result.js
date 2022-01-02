const axios = require('axios');

const getResult = async (uah) => {
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    let course = {
        usd: "",
        eur: "",
        rur: "",
        btc: ""
    };
    response.data.map(res => {
        switch (res.ccy) {
            case "USD":
                course.usd = res.buy;
                break;
            case "EUR":
                course.eur = res.buy;
                break;
            case "RUR":
                course.rur = res.buy;
                break;
            case "BTC":
                course.btc = res.buy * course.usd;
                break;
        }
    });

    const result = {
        uah: uah,
        usd: +(uah / course.usd).toFixed(1),
        eur: +(uah / course.eur).toFixed(1),
        rur: +(uah / course.rur).toFixed(1),
        btc: +(uah / course.btc).toFixed(6)
    };
    return await result;
}

module.exports = getResult;
