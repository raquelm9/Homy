const { register } = require('../app/controllers/users.controller');
const mongoose = require('mongoose');
const { User } = require('../app/models/user.model');
const db = require('../app/models/db');

describe('User controller', () => {

    afterEach(() => mongoose.connection.close())

    describe('Find a user', () => {
        it('should find a record', async () => {
            const user = await User.find()
            // const user = { email: "johnsmith@email.com" }

            return expect(user.email).toBeDefined()

        })
    })
})