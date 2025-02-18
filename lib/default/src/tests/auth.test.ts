import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { CreateUserDto } from '../dtos/users.dto';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', () => {
      const userData: CreateUserDto = {
        email: 'lkm@gmail.com',
        password: 'q1w2e3r4',
      };
      const authRoute = new AuthRoute();
      const app = new App([authRoute]);

      return request(app.getServer()).post(`${authRoute}/signup`).send(userData);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'lim@gmail.com',
        password: 'q1w2e3r4',
      };
      process.env.JWT_SECRET = 'jwt_secret';
      const authRoute = new AuthRoute();
      const app = new App([authRoute]);

      return request(app.getServer())
        .post(`${authRoute}/login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', () => {
      const authRoute = new AuthRoute();
      const app = new App([authRoute]);

      return request(app.getServer())
        .post(`${authRoute}/logout`)
        .expect('Set-Cookie', /^Authorization=\;/);
    });
  });
});
