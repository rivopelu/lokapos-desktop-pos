import { ROUTES } from '@renderer/routes/routes';
import { useNavigate } from 'react-router-dom';

export default class AuthServices {
  private navigate = useNavigate();
  public successLogin(data: string): void {
    localStorage.setItem('token', data);
    this.navigate(ROUTES.HOME());
  }

  public async logout() {
    localStorage.clear();
    this.navigate(ROUTES.SIGN_IN());
  }

  public authCheck(): boolean {
    return !!localStorage.getItem('token');
  }
}
