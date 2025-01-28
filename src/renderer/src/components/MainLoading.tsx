import { CircularProgress } from '@mui/material';
import { t } from 'i18next';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';

export function MainLoading() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  if (Account?.getMe?.loading) {
    return (
      <div
        className={'h-screen w-screen bg-white flex-col gap-8 fixed top-0 left-0 flex items-center justify-center'}
        style={{ zIndex: 999 }}
      >
        <CircularProgress size={50} />
        <p className={'uppercase text-3xl text-primary-main'}>{t('loading')}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
