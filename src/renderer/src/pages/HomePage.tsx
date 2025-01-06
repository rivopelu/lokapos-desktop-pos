import { Button } from '@mui/material';
import { PageContainer } from '@renderer/components/PageContainer';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';
import { ROUTES } from '@renderer/routes/routes';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);

  useEffect(() => {
    console.log(Account?.getMe?.data);
  }, [Account?.getMe]);

  return (
    <main>
      <PageContainer>
        <div className=" w-full">
          <Link to={ROUTES.SIGN_IN()}>
            <Button>LOGOUT</Button>
          </Link>
          {Array.from({ length: 100 }).map((_, i) => (
            <h1 key={i}>HOMEPAGE {i}</h1>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
