const config = require('../config');
const fetch = require('node-fetch');



exports.urlShortener = async (url) => {
    // console.log(url)
    let res = await fetch(
        `https://cutt.ly/api/api.php?key=${config.CUTTLY.API_KEY}&short=${url}`, {
        method: 'POST',
    });


    res = await res.json();
    //handle error on status later
    return res.url.shortLink


}