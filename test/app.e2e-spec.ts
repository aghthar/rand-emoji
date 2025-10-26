import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  describe(`/ GET`, () => {
    // when valid api key return 200
    it('/ (GET) with valid API key', () => {
      return request(server)
        .get('/')
        .set('x-api-key', 'BondJamesBond')
        .expect(200);
    });

    // when invalid api key return 403
    it('/ (GET) with invalid API key', () => {
      return request(server).get('/').set('x-api-key', 'invalid').expect(403);
    });

    // when no api key return 403
    it('/ (GET) with no API key', () => {
      return request(server).get('/').expect(403);
    });

    // / GET with valid api key should return a data object with random emoji
    it('/ (GET) with valid API key should return a data object with random emoji', () => {
      return request(server)
        .get('/')
        .set('x-api-key', 'BondJamesBond')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            data: {
              emoji: expect.any(String),
              browser: 'Unknown',
            },
          });
        });
    });

    // /?index=0 GET with valid api key should return a data object with the first emoji
    it('/?index=0 (GET) with valid API key should return a data object with the first emoji', () => {
      return request(server)
        .get('/?index=0')
        .set('x-api-key', 'BondJamesBond')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            data: {
              emoji: '😀',
              browser: 'Unknown',
            },
          });
        });
    });

    // /?index=<index> and that index is out of range GET with valid api key should return 404
    it('/?index=100 (GET) with valid API key should return 404', () => {
      return request(server)
        .get('/?index=100')
        .set('x-api-key', 'BondJamesBond')
        .expect(400);
    });

    // /?index=-1 GET with valid api key should return 400
    it('/?index=-1 (GET) with valid API key should return 400', () => {
      return request(server)
        .get('/?index=-1')
        .set('x-api-key', 'BondJamesBond')
        .expect(400);
    });

    // /?index=abc GET with valid api key should return 400
    it('/?index=abc (GET) with valid API key should return 400', () => {
      return request(server)
        .get('/?index=abc')
        .set('x-api-key', 'BondJamesBond')
        .expect(400);
    });

    afterEach(async () => {
      await app.close();
    });
  });
});
