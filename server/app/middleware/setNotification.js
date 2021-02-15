const { Request } = require('../models/request.model');
const { DONE } = require('../constants/status');
const { Resident } = require('../models/resident.model');

module.exports = async function setNotification(req, res, next) {
    const notifications = [];

    const requests = await Request.find({
        user_id: req.user._id,
        status: DONE
    })

    if (requests.length) {
        for (let i = 0; i < requests.length; i++) {
            notifications.push(requests[i]._id)

        }
    }
    if (notifications.length) {
        await Resident.updateOne(
            { user_id: req.user._id, },
            {
                notification_active: true,
                notification_req_id: notifications
            }
        )
    } else {
        await Resident.updateOne(
            { user_id: req.user._id, },
            {
                notification_active: false,
                notification_req_id: []
            }
        )
    }

    next();

}