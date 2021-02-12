module.exports = (data, type) => {

    'use strict';

    const fs = require('fs');
    data.dateCreation = Date.now()
    let dataJSON = JSON.stringify(data)

    fs.appendFile(`./log.${type}.json`, dataJSON, (err) => {
        if (err) throw err;
    });

}



