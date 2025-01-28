import { CardBody, MainCard } from '@renderer/components/MainCard';
import { InputSelect } from '@renderer/components/InputSelect';
import { t } from 'i18next';
import { LoadingButton } from '@mui/lab';
import { useStartShiftPage } from '@renderer/pages/shift/useStartShiftPage';

export function StartShiftPage() {
  const page = useStartShiftPage();

  return (
    <div className={'min-h-[90vh] w-screen flex items-center justify-center'}>
      <MainCard>
        <CardBody className={'grid gap-8'}>
          <InputSelect options={page.accountList} label={t('team')} placeholder={t('select_shift_team')} />
          <LoadingButton variant={'contained'}>{t('submit')}</LoadingButton>
        </CardBody>
      </MainCard>
    </div>
  );
}
