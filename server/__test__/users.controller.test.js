const { register } = require('../app/controllers/users.controller');
const { User } = require('../app/models/user.model');
const mongoose = require('mongoose');
const app = require('./app')
const db = require('./db');
const request = require("supertest");

describe('User controller', () => {
    beforeAll(async () => await db.connect());

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await db.clearDatabase());

    /**
     * Remove and close the db and server.
     */
    afterAll(async () => await db.closeDatabase());

    describe('User', () => {
        it('should create a user resident', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    email: "johnsmith@email.com",
                    password: "123456789"
                })

            expect(res).toBeDefined();
            expect(res.status).toBe(200);
            expect(res.body.email).toBe('johnsmith@email.com')
            expect(res.body.isManager).toBe(false)
        })
        it('should create a user resident', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    email: "manager@email.com",
                    password: "123456789",
                    isManager: true
                })

            expect(res).toBeDefined();
            expect(res.status).toBe(200);
            expect(res.body.email).toBe('manager@email.com')
            expect(res.body.isManager).toBe(true)
        })
    })
})