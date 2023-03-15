import request from "supertest";
import mongoose from "mongoose";
import { app, server } from '../index.js';
import * as dotenv from "dotenv";
import * as models from "../app/models/index.js";

dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.TEST_DB_CONNECTION_URI);
    await models.Acronym.deleteMany({});
});

afterEach(async () => {
    await mongoose.connection.close();
});

afterAll(() => {
    server.close();    
});

describe('GET /acronym', () => {
    it('should return a list of all acronyms', async () => {
        const response = await request(app).get('/acronym');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /acronym', () => {
    it('should create a new acronym', async () => {
        const response = await request(app).post('/acronym').send({
            acronym: '2B',
            definition: 'To Be'
        });
        expect(response.statusCode).toBe(201);
    });
});

describe('PATCH /acronym', () => {
    it('should create a test acronym', async () => {
        const response = await request(app).post('/acronym').send({
            acronym: '2G2BT',
            definition: 'Too good to be true -- replaceme'
        });
        expect(response.statusCode).toBe(201);
    });

    it('should update the test acronym', async () => {
        const response = await request(app).patch('/acronym').send({
            acronym: '2G2BT',
            definition: 'Too Good To Be True'
        });
        expect(response.statusCode).toBe(200);
    });
});

describe('DELETE /acronym', () => {
    if('should delete an acronym', async () => {
        const response = await request(app).delete('/acronym').send({
            acronym: '2G2BT'
        });
        expect(response.statusCode).toBe(200);
    });
});
