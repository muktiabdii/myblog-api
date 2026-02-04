import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth E2E (JWT TOken)', () => {
    let app: INestApplication;
    let accessToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    const testUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword',
    };

    it('Register User', async () => {
        const res = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

        expect(res.body.status).toBe('success');
        expect(res.body.data.email).toBe(testUser.email);
    });

    it('Login user & get token', async () => {
        const rest = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
            email: testUser.email,
            password: testUser.password,
        })
        .expect(200);

        expect(rest.body.status).toBe('success');
        expect(rest.body.data.accessToken).toBeDefined();

        accessToken = rest.body.data.accessToken;
    }); 

    it('Access protected route with JWT token', async () => {
        const res = await request(app.getHttpServer())
        .get('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

        expect(res.body.status).toBe('success');
        expect(res.body.data.email).toBe(testUser.email);
    });

    it('Fail acess protected route without token', async () => {
        await request(app.getHttpServer())
        .get('/api/users/me')
        .expect(401);
    });
});