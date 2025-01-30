import { toast } from 'react-toastify';

export class UiServices {
  public handleSnackbarSuccess(message: string, variant?: 'success' | 'error' | 'info') {
    if (variant === 'error') {
      toast.error(message);
    } else if (variant === 'info') {
      toast.info(message);
    } else {
      toast.success(message);
    }
  }
}
