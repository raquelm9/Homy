const mongoose = require('mongoose');
const app = require('./app')
const db = require('./db');
const request = require("supertest");

describe('User controller', () => {

    beforeAll(async () => await db.connect());

    /**Remove and close the db and server.*/
    afterAll(async () => await db.closeDatabase());

    describe('User is a resident', () => {

        let userId = '';
        const residentEmail = "johnsmith@email.com";
        const residentPassword = "123456789";
        const residentUnitNum = '401';
        const residentName = "John Smith";

        it('should register a resident', async () => {
            const resUser = await request(app)
                .post('/api/users')
                .send({
                    email: residentEmail,
                    password: residentPassword
                })

            userId = resUser.body._id;

            expect(resUser).toBeDefined();
            expect(resUser.status).toBe(200);
            expect(resUser.body.email).toBe(residentEmail)
            expect(resUser.body.isManager).toBe(false)
        })

        it('should not register a resident if email exist', async () => {
            const resUser = await request(app)
                .post('/api/users')
                .send({
                    email: residentEmail,
                    password: residentPassword
                })



            expect(resUser).toBeDefined();
            expect(resUser.status).toBe(400);
        })

        it('should create an account resident', async () => {
            const resResident = await request(app)
                .post('/api/residents')
                .send({
                    unit_num: residentUnitNum,
                    email: residentEmail,
                    name: residentName,
                    user_id: userId
                })

            expect(resResident).toBeDefined();
            expect(resResident.status).toBe(200);
            expect(resResident.body.email).toBe(residentEmail);
            expect(resResident.body.unit_num).toBe(residentUnitNum);
            expect(resResident.body.name).toBe(residentName);
            expect(resResident.body.user_id).toBe(userId);

        })

        it('should login a resident', async () => {

            const resLoginResident = await request(app)
                .post('/api/login')
                .send({
                    email: residentEmail,
                    password: residentPassword
                })


            expect(resLoginResident).toBeDefined();
            expect(resLoginResident.status).toBe(200);
            expect(resLoginResident.body.name).toBe(residentName);
            expect(resLoginResident.body.email).toBe(residentEmail);
            expect(resLoginResident.body._id).toBe(userId);
            expect(resLoginResident.header['x-auth-token']).toBeDefined();
        })
        it('should not login a resident if password is wrong', async () => {

            const resLoginResident = await request(app)
                .post('/api/login')
                .send({
                    email: residentEmail,
                    password: 'residentPassword'
                })

            expect(resLoginResident).toBeDefined();
            expect(resLoginResident.status).toBe(400);
            expect(resLoginResident.body).toStrictEqual({});
        })
    })

    describe('User is a manager', () => {

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

            expect(resUser).toBeDefined();
            expect(resUser.status).toBe(200);
            expect(resUser.body.email).toBe(managerEmail)
            expect(resUser.body.isManager).toBe(true)
        })

        it('should create an account manager', async () => {
            const resManager = await request(app)
                .post('/api/managers')
                .send({
                    name: managerName,
                    user_id: userId,
                    building_id: "1"
                })

            expect(resManager).toBeDefined();
            expect(resManager.status).toBe(200);
            expect(resManager.body.name).toBe(managerName)
            expect(resManager.body.building_id).toBe('1')
            expect(resManager.body.user_id).toBe(userId);
        })

        it('should login a manager', async () => {
            const resLoginManager = await request(app)
                .post('/api/login')
                .send({
                    email: managerEmail,
                    password: managerPassword,
                })


            expect(resLoginManager).toBeDefined();
            expect(resLoginManager.status).toBe(200);
            expect(resLoginManager.body.isManager).toBe(true);
            expect(resLoginManager.body.name).toBe(managerName);
            expect(resLoginManager.body.email).toBe(managerEmail);
            expect(resLoginManager.body._id).toBe(userId);
            expect(resLoginManager.header['x-auth-token']).toBeDefined();
        })
        it('should not login a manager if password is wrong', async () => {

            const resLoginManager = await request(app)
                .post('/api/login')
                .send({
                    email: managerEmail,
                    password: 'managerPassword'
                })

            expect(resLoginManager).toBeDefined();
            expect(resLoginManager.status).toBe(400);
            expect(resLoginManager.body).toStrictEqual({});
        })
    })
})