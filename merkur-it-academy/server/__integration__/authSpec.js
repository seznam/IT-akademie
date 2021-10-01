import request from 'supertest';

import { app } from '../app';

describe('Authorization', () => {
  it('should return 400 for missing credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john.doe' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(expect.any(String));
  });

  it('should return 400 for invalid user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john', password: '123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(expect.any(String));
  });

  it('should return 400 for invalid password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john.doe', password: '123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(expect.any(String));
  });

  it('should return 200, cookies and user data', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'john.doe', password: 'john.doe' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchInlineSnapshot(
      `
      Object {
        "data": Object {
          "user": Object {
            "avatar": "https://www.blexar.com/avatar.png",
            "displayName": "John Doe",
            "username": "john.doe",
          },
        },
      }
    `
    );
    expect(res.headers['set-cookie'][0]).toEqual(
      expect.stringContaining('merkur-it-academy-auth')
    );
  });
});
