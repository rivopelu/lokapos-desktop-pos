import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';

export function useProfilePage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const profile = Account?.getMe;

  return {
    profile,
  };
}
