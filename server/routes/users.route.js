module.exports = app => {

    const users = require('../app/controllers/users.controller');

    const router = require('express').Router();

    router.post('/', users.register);

    app.use('/api/users', router);

}