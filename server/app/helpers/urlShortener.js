const config = require('../config');
const fetch = require('node-fetch');



exports.urlShortener = async (url) => {
    // console.log(url)
    const urlTest = `https://adoring-leakey-4abb67.netlify.app/notification/requests/jdjkakalld`
    let res = await fetch(
        `https://cutt.ly/api/api.php?key=${config.CUTTLY.API_KEY}&short=${urlTest}`, {
        method: 'POST',
    });


    res = await res.json();
    //handle error on status later
    return res.url.shortLink


}