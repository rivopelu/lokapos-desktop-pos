import { ROUTES } from '@renderer/routes/routes';

export default class AuthServices {
  public successLogin(data: string): void {
    localStorage.setItem('token', data);
    window.location.replace(ROUTES.HOME());
  }

  public async logout() {
    localStorage.clear();
    window.location.replace(ROUTES.SIGN_IN());
  }

  public authCheck(): boolean {
    return !!localStorage.getItem('token');
  }
}
