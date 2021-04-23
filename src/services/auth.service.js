import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(email, password) {
    console.log(`${this.BASE_URL}/user/signin`);
    const result = await post(`${this.BASE_URL}/user/signin`, { email, password });
    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result.data.email;
  }

  async signup(email, password) {
    await post(`${this.BASE_URL}/user/signup`, { email, password });
  }

  async signout() {
    this.removeToken();
  }
}
