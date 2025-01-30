import { PageContainer } from '@renderer/components/PageContainer';
import { CardBody, MainCard } from '@renderer/components/MainCard';
import { useProfilePage } from '@renderer/pages/profile/useProfilePage';
import { Avatar, Button } from '@mui/material';
import { t } from 'i18next';
import { MdLogout } from 'react-icons/md';

export function ProfilePage() {
  const page = useProfilePage();
  return (
    <div className={'mt-8'}>
      <PageContainer>
        <div>
          <MainCard>
            <CardBody>
              <div className={'flex  justify-between'}>
                <div className={'flex gap-5'}>
                  <Avatar sx={{ height: 100, width: 100, borderRadius: 2 }} src={page?.profile?.data?.avatar} />
                  <div className={'flex justify-between h-full gap-2 flex-col'}>
                    <div>
                      <h1 className={'font-semibold text-3xl capitalize'}>{page.profile?.data?.full_name}</h1>
                      <p>{page?.profile?.data?.email}</p>
                    </div>
                    <Button
                      onClick={() => page.onLogout()}
                      variant={'contained'}
                      color={'error'}
                      startIcon={<MdLogout />}
                    >
                      {t('logout')}
                    </Button>
                  </div>
                </div>
                <div>{page.profile?.data?.role || '-'}</div>
              </div>
            </CardBody>
          </MainCard>
        </div>
      </PageContainer>
    </div>
  );
}
