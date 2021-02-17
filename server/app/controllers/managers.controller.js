const { Manager, validateManager } = require('../models/manager.model');

exports.createAccount = async (req, res) => {
    try {
        const result = validateManager(req.body);

        if (result.error) {
            return res.status(400).send(result.error.details[0].message);
        }
        // console.log(req.body)
        let manager = new Manager({
            name: req.body.name,
            user_id: req.body.user_id,
            building_id: req.body.building_id
        })

        manager = await manager.save()

        res.status(200).send(manager)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

}