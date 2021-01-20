module.exports = app => {
    const auth = require('../app/middleware/auth');
    const users = require('../app/controllers/auth.controller');

    const router = require('express').Router();

    router.post('/', users.login);

    router.get('/', auth, users.verifyUser);

    app.use('/api/login', router);

}