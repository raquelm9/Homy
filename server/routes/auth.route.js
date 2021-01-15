module.exports = app => {

    const users = require('../app/controllers/auth.controller');

    const router = require('express').Router();

    router.post('/', users.login);

    router.get('/', users.verifyUser);

    app.use('/api/login', router);

}