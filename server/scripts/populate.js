const data = require('./db.js');
const fetch = require('node-fetch');
const arguments = process.argv.slice(2);

const urlRequest = '/api/service-requests';
const urlResident = '/api/residents';

const fetchRequest = async (url, data) => {
    let response = await fetch(`http://localhost:3008${url}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response) return console.log('Dont work')
    response = await response.json();
    return response
}


// data.requests.forEach((data, index) => {
//     let response;
//     setTimeout(async () => {
//         // response = await fetchRequest(urlRequest, data);

//     }, 2000)
//     console.log(`Created 1 requests in database`);
//     return response
// })
