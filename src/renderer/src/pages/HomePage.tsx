import { Button } from '@mui/material';
import { PageContainer } from '@renderer/components/PageContainer';
import { ROUTES } from '@renderer/routes/routes';
import { Link } from 'react-router-dom';

export function HomePage() {
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
