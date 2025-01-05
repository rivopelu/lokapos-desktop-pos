import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import AuthServices from './auth.service';

export default class ErrorService {
  private authService = new AuthServices();
  private handleSnackbar(message: string) {
    toast.error(message);
  }

  private handleSnackbarSuccess(message: string) {
    toast.success(message);
  }

  public fetchApiError(error: AxiosError<any>) {
    if (error?.response?.status === 401) {
      this.authService.logout().then();
    } else {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error?.response?.data?.errors?.message
          ? error?.response?.data?.errors?.message
          : 'Terjadi Kesalahan Pada Sistem';
      } else message = String(error);
      return this.handleSnackbar(message);
    }
  }

  public fetchApiSuccess(message: string) {
    return this.handleSnackbarSuccess(message ? message : 'Success');
  }
}
