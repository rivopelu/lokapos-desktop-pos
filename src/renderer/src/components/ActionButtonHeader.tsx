import { ROUTES } from '@renderer/routes/routes';
import { Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';

export function ActionButtonHeader() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const profile = Account?.getMe?.data;

  return (
    <div className={'flex items-center'}>
      <div>{profile?.shift_id}</div>

      <Link to={ROUTES.PROFILE()}>
        <IconButton>
          <Avatar sx={{ width: 32, height: 32 }} src={profile?.avatar} />
        </IconButton>
      </Link>
    </div>
  );
}
