const data = require('./data.js');
const fetch = require('node-fetch');
const arguments = process.argv.slice(2);

const urlRequest = '/api/service-requests';
const urlResident = '/api/residents';
const urlRegister = '/api/users';

const arrOfRegisterId = [];

const fetchRequest = async (url, method, data) => {
    let response = await fetch(`http://localhost:3008${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response) return console.log('Dont work')
    response = await response.json();
    return response
}


data.requests.forEach(data => {
    let response;
    setTimeout(async () => {
        response = await fetchRequest(urlRequest, 'POST', data);

    }, 2000)
    console.log(`Created 1 requests in database`);
    return response
})


// data.register.forEach(data => {
//     let response;
//     setTimeout(async () => {
//         response = await fetchRequest(urlRegister, 'POST', data);
//         console.log(`${data.email} in database`);
//     }, 2000)

//     return response
// })