module.exports = app => {

    const residents = require('../app/controllers/residents.controller');

    const router = require('express').Router();

    router.post('/', residents.createAccount);

    router.get('/', residents.getResidents);

    router.delete('/:id', residents.deleteOne);

    app.use('/api/residents', router);
}