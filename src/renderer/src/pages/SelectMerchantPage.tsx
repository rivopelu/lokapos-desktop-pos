import { useSelectMerchantPage } from '@renderer/pages/useSelectMerchantPage';
import { InputSelect } from '@renderer/components/InputSelect';
import { t } from 'i18next';
import { CardBody, MainCard } from '@renderer/components/MainCard';
import { LoadingButton } from '@mui/lab';

export function SelectMerchantPage() {
  const page = useSelectMerchantPage();

  return (
    <div className={'flex items-center justify-center min-h-screen'}>
      <div>
        <MainCard>
          <CardBody className={'grid gap-7'}>
            <p className={'capitalize text-2xl'}>{t('select_merchant_description_card')}</p>
            <InputSelect
              value={page.selectedMerchantId}
              onChange={(e) => page.setSelectedMerchantId(e as string)}
              placeholder={t('select_merchant')}
              label={t('merchant')}
              options={page.listMerchant}
            />
            <LoadingButton
              loading={page.loadingSubmit}
              onClick={page.onSubmit}
              disabled={!page.selectedMerchantId}
              variant={'contained'}
            >
              {t('submit')}
            </LoadingButton>
          </CardBody>
        </MainCard>
      </div>
    </div>
  );
}
