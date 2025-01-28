import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';
import AuthServices from '@renderer/service/auth.service';

export function useProfilePage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const profile = Account?.getMe;
  const authService = new AuthServices();

  const onLogout = authService.logout;

  return {
    onLogout,
    profile,
  };
}
