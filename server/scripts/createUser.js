const prompt = require('prompt');
const fetch = require('node-fetch');


const urlRegister = 'http://localhost:3008/api/users';
const urlResident = 'http://localhost:3008/api/residents';
const urlManager = 'http://localhost:3008/api/managers';
console.log();
console.log('You"re going to create a resident account!')
console.log();

prompt.start();

const register = async () => {

    let { email, password, isManager } = await prompt.get(['email', 'password', 'isManager']);

    let response = await fetch(urlRegister, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            isManager: isManager || false
        })
    })

    response = await response.json();

    if (response.error) return console.log(response.error)

    console.log(response)

    if (isManager) {//*******Manager******* */
        let { name, building_id } = await prompt.get(['name', 'building_id']);

        response = await fetch(urlManager, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                building_id: building_id,
                name,
                user_id: response._id
            })
        })
    } else {/***********Resident********************/
        let { unit_num, name } = await prompt.get(['unit_num', 'name']);

        response = await fetch(urlResident, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                unit_num,
                name,
                user_id: response._id
            })
        })
    }


    response = await response.json();

    if (response.error) return console.log(response.error)

    console.log(response)
    if (isManager) return console.log('Thanks your manager has been registered.')
    console.log('Thanks your resident has been registered.')

}


register()