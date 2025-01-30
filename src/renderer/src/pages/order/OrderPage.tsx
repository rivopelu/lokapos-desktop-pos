import { CircularProgress, IconButton } from '@mui/material';
import { ITableColumnData, MainTable } from '@renderer/components/MainTable';
import { PageContainer } from '@renderer/components/PageContainer';
import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { t } from 'i18next';
import { MdInfo } from 'react-icons/md';
import { useOrderPage } from './useOrderPage';
import { PopupModal } from '@renderer/components/PopupModal';
import { TextHelper } from '@renderer/helper/text-helper';
import { OrderStatusText } from '@renderer/components/OrderStatusText';
import { PlatformUi } from '@renderer/components/PlatformUi';
import { CardBody, MainCard } from '@renderer/components/MainCard';
import { LoadingButton } from '@mui/lab';

export function OrderPage() {
  const page = useOrderPage();
  const textHelper = new TextHelper();

  const tableColumn: ITableColumnData[] = [
    {
      key: 'code',
      headerTitle: t('order_code'),
      value: 'code',
    },
    {
      key: 'total_item',
      headerTitle: t('total_item'),
      layouts: (e: IResListOrder) => <p>{e.total_item} item</p>,
    },
    {
      key: 'order_type',
      headerTitle: t('order_type'),
      layouts: (e: IResListOrder) => <p className="font-semibold uppercase">{textHelper.parseTextEnum(e.type)}</p>,
    },
    {
      key: 'platform',
      headerTitle: t('platform'),
      layouts: (e: IResListOrder) => (
        <div className={'flex items-center justify-between text-center w-full '}>
          <PlatformUi platform={e.platform} />
        </div>
      ),
    },
    {
      key: 'order_status',
      headerTitle: t('order_status'),
      layouts: (e: IResListOrder) => <OrderStatusText text={e.status} />,
    },
    {
      key: 'action',
      headerTitle: '',
      layouts: (e: IResListOrder) => (
        <div>
          <IconButton onClick={() => page.onClickDetail(e)}>
            <MdInfo />
          </IconButton>
        </div>
      ),
    },
  ];

  function componentDetail() {
    return (
      <div className={'min-w-[600px]'}>
        <div className={'grid gap-4 '}>
          <div>{page?.dataDetail?.id || ''}</div>
          {page.loadingDetail ? (
            <div className={'h-40 flex items-center justify-center'}>
              <CircularProgress />
            </div>
          ) : (
            page.dataDetail &&
            page.dataDetail.menu_list.map((item, i) => (
              <MainCard key={i}>
                <CardBody>
                  <div className={'flex justify-between text-2xl   pb-2 '}>
                    <p>{item.name}</p>
                    <p className={'font-semibold'}>x{item.quantity}</p>
                  </div>
                </CardBody>
              </MainCard>
            ))
          )}
        </div>
        {page.dataDetail && (
          <div className={'mt-5 grid'}>
            <LoadingButton loading={page.loadingReadyOrder} onClick={() => page.onReadyOrder()} variant={'contained'}>
              {t('done_order')}
            </LoadingButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="py-8">
      <PopupModal
        title={page.dataDetail?.code.toString() || ''}
        onClose={page.onCloseModalDetail}
        component={componentDetail()}
        open={page.showModalDetail}
        loading={page.loadingDetail}
      />
      <PageContainer>
        <MainTable loading={page.loading} data={page.dataList} columns={tableColumn} />
      </PageContainer>
    </div>
  );
}
