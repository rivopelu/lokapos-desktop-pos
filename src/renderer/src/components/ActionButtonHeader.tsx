import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, IconButton } from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import { useAppSelector } from '@renderer/redux/store';
import { ROUTES } from '@renderer/routes/routes';
import { IResGetMe } from '@renderer/models/response/IResGetMe';

export function ActionButtonHeader() {
  const Account = useAppSelector((state) => state.Account);
  const profile: IResGetMe = Account?.getMe?.data;
  const shiftStart = profile?.start_shift_date ? new Date(profile.start_shift_date) : null;
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (!shiftStart) return;

    const interval = setInterval(() => {
      const diff = differenceInSeconds(new Date(), shiftStart);
      const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [shiftStart]);

  return (
    <div className="flex items-center gap-2">
      {profile?.start_shift_date && (
        <Button color={'success'} startIcon={<div className={'h-2 w-2 bg-green-600 rounded-full'}></div>}>
          {elapsedTime}
        </Button>
      )}
      <Link to={ROUTES.PROFILE()}>
        <IconButton>
          <Avatar sx={{ width: 32, height: 32 }} src={profile?.avatar} />
        </IconButton>
      </Link>
    </div>
  );
}
