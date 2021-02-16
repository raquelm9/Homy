const mongoose = require('mongoose');
const app = require('./app')
const db = require('./db');
const request = require("supertest");

describe('Request', () => {
    let userId = '';
    let xAuthTokenRes = '';
    let xAuthTokenMan = '';
    let requestId = '';

    beforeAll(async () => {
        await db.connect()
        const residentEmail = "johnsmith@email.com";
        const residentPassword = "123456789";
        const residentUnitNum = '401';
        const residentName = "John Smith";

        const resUser = await request(app)
            .post('/api/users')
            .send({
                email: residentEmail,
                password: residentPassword
            })

        userId = resUser.body._id;
        xAuthTokenRes = resUser.header['x-auth-token'];
        const resResident = await request(app)
            .post('/api/residents')
            .send({
                unit_num: residentUnitNum,
                email: residentEmail,
                name: residentName,
                user_id: userId
            })
        const managerEmail = "manager@email.com";
        const managerPassword = "123456789";
        const managerName = "John Cena";

        it('should register a manager', async () => {
            const resUser = await request(app)
                .post('/api/users')
                .send({
                    email: managerEmail,
                    password: managerPassword,
                    isManager: true
                })

            userId = resUser.body._id;

        })

        xAuthTokenMan = resUser.header['x-auth-token'];

        it('should create an account manager', async () => {
            const resManager = await request(app)
                .post('/api/managers')
                .send({
                    name: managerName,
                    user_id: userId,
                    building_id: "1"
                })

        })

    });
    /**Remove and close the db and server.*/
    afterAll(async () => await db.closeDatabase());

    describe('Request ', () => {

        it('should create a request', async () => {
            const requestCreated = await request(app)
                .post('/api/service-requests')
                .send({
                    type: "Plumber",
                    date: "Wed Jan 13 2021 16:50:53 GMT-0700 (Mountain Standard Time)",
                    subject: "My Request",
                    description: "This is a description",
                    unit_num: "401",
                    resident_name: "John Smith"
                })
                .set('x-auth-token', xAuthTokenRes)

            requestId = requestCreated.body._id;

            expect(requestCreated).toBeDefined();
            expect(requestCreated.status).toBe(200);
            expect(requestCreated.body.type).toBe('Plumber');

        })

        it('should get a request from a user', async () => {
            const requestGetByUser = await request(app)
                .get('/api/service-requests')
                .send()
                .set('x-auth-token', xAuthTokenRes)


            expect(requestGetByUser).toBeDefined();
            expect(requestGetByUser.status).toBe(200);
            expect(requestGetByUser.body[0].type).toBe('Plumber');
            expect(requestGetByUser.body[0].subject).toBe('My Request');
            expect(requestGetByUser.body[0].description).toBe('This is a description');
            expect(requestGetByUser.body[0].unit_num).toBe('401');
            expect(requestGetByUser.body[0].resident_name).toBe('John Smith');

        })

        it('should get all the request as a manager', async () => {
            const requestGetAll = await request(app)
                .get('/api/service-requests')
                .send()
                .set('x-auth-token', xAuthTokenMan)

            expect(requestGetAll).toBeDefined();
            expect(requestGetAll.status).toBe(200);
            expect(requestGetAll.body.length).toBe(1);

        })

        it('should get a request using it"s Id', async () => {
            const requestById = await request(app)
                .get(`/api/service-requests/${requestId}`)
                .send()
                .set('x-auth-token', xAuthTokenRes)

            expect(requestById).toBeDefined();
            expect(requestById.status).toBe(200);
            expect(requestById.body.type).toBe('Plumber');
            expect(requestById.body.subject).toBe('My Request');
            expect(requestById.body.description).toBe('This is a description');
            expect(requestById.body.unit_num).toBe('401');
            expect(requestById.body.resident_name).toBe('John Smith');
        })

    })



})