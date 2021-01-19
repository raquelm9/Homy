module.exports = app => {

    const residents = require('../app/controllers/residents.controller');

    const router = require('express').Router();

    router.post('/', residents.createAccount);

    router.get('/', residents.getResidents);

    app.use('/api/residents', router);
}