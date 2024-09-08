import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

const userTokenMock = jest.fn();
const investmentIdMock = jest.fn();

describe('Investment (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer()).post('/users').send({
      fullname: 'user investment',
      email: 'userinvesment@gmail.com',
      password: 'password',
    });

    const responseLogin = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'userinvesment@gmail.com',
        password: 'password',
      });

    userTokenMock.mockReturnValue(responseLogin.body.accessToken);
  });

  it('/investment (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/investments')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        name: 'investment 1',
        initialValue: 1000,
        initialDate: '2021-10-10',
      });

    investmentIdMock.mockReturnValue(response.body.id);

    expect(response.status).toBe(201);
  });

  it('/investment/{investment} (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/investments/${investmentIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('/invesments/list (LIST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/investments/list')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        limit: 50,
        offset: 0,
      });

    expect(response.status).toBe(200);
  });

  it('/investments/{investment}/withdraw (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/investments/${investmentIdMock()}/withdraw`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        value: 400,
      });

    expect(response.status).toBe(200);
  });
});
