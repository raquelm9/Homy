module.exports = app => {
    const request = require('../app/controllers/requests.controller')

    const router = require('express').Router();

    router.post('/', request.createRequest);


    app.use('/api/service-requests', router);
}