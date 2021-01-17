module.exports = app => {
    const request = require('../app/controllers/requests.controller')

    const router = require('express').Router();

    router.post('/', request.createRequest);

    router.get('/', request.getRequests);

    router.delete("/:id", request.deleteRequest)

    app.use('/api/service-requests', router);
} 