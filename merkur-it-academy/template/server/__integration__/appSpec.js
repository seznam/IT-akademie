import request from 'supertest';

import { app } from '../app';

describe('Widget', () => {
  it('should return merkur JSON structure for widget', async () => {
    const res = await request(app).get('/widget');

    expect(res.statusCode).toEqual(200);
    expect(res.body.assets.length).toBeGreaterThan(0);
    delete res.body.assets;
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "containerSelector": null,
        "error": Object {
          "message": null,
          "status": null,
        },
        "html": "<div class=\\"m-merkur-login\\"><div class=\\"m-login__button\\"><button type=\\"button\\" disabled class=\\"m-text-button\\">Sign in</button></div></div>",
        "name": "merkur-login",
        "props": Object {
          "environment": Object {
            "apiUrl": "https://api.github.dev/",
          },
        },
        "slots": Object {
          "modal": Object {
            "html": "",
            "name": "modal",
          },
        },
        "state": Object {
          "error": null,
          "isModalVisible": false,
          "user": null,
        },
        "version": "0.0.1",
      }
    `);
  });

  it('should return 404 for not defined route', async () => {
    const res = await request(app).get('/x');

    expect(res.statusCode).toEqual(404);
    expect(res.body.error.status).toEqual(404);
  });

  it('should return 200 for playground page', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
  });
});
