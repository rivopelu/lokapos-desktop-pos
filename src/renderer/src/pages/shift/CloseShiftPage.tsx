import { CardBody, MainCard } from '@renderer/components/MainCard';
import { t } from 'i18next';
import { useCloseShiftPage } from '@renderer/pages/shift/useCloseShiftPage';
import { Avatar, CircularProgress, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export function CloseShiftPage() {
  const page = useCloseShiftPage();

  return (
    <div className={'h-[90vh] flex items-center justify-center'}>
      <MainCard>
        <CardBody>
          <div className={'flex items-center justify-between'}>
            <div className={'capitalize font-semibold text-xl'}>{t('close_shift')}</div>
            {page.elapsedTime && (
              <div className={'flex items-center gap-3'}>
                <div className={'h-2 w-2 bg-green-600 rounded-full'}></div>
                <div>{page.elapsedTime}</div>
              </div>
            )}
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div className={'grid gap-7'}>
            <div className={'grid grid-cols-3 gap-5'}>
              {page.dataAccount.map((item, i) => (
                <div key={i} className={'flex items-center  rounded-lg gap-4 border p-3'}>
                  <Avatar src={item.avatar} />
                  <div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                  </div>
                </div>
              ))}
            </div>
            {page.loadingDetail && (
              <div className={'flex items-center justify-center  h-[200px] w-[1000px]'}>
                <CircularProgress />
              </div>
            )}
            <LoadingButton loading={page.loadingSubmit} onClick={page.onSubmit} variant={'contained'}>
              {t('close_the_shift_now')}
            </LoadingButton>
          </div>
        </CardBody>
      </MainCard>
    </div>
  );
}
