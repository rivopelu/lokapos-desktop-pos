import { IconButton } from '@mui/material';
import { ITableColumnData, MainTable } from '@renderer/components/MainTable';
import { PageContainer } from '@renderer/components/PageContainer';
import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { t } from 'i18next';
import { MdInfo } from 'react-icons/md';
import { useOrderPage } from './useOrderPage';
import { PopupModal } from '@renderer/components/PopupModal';

export function OrderPage() {
  const page = useOrderPage();

  const tableColumn: ITableColumnData[] = [
    {
      key: 'code',
      headerTitle: t('order_code'),
      value: 'code',
    },
    {
      align: 'center',
      key: 'total_item',
      headerTitle: t('total_item'),
      layouts: (e: IResListOrder) => <p>{e.total_item} item</p>,
    },
    {
      align: 'center',
      key: 'order_type',
      headerTitle: t('order_type'),
      layouts: (e: IResListOrder) => <p className="font-semibold">{e.type}</p>,
    },
    {
      align: 'center',
      key: 'platform',
      headerTitle: t('platform'),
      layouts: (e: IResListOrder) => <p className="font-semibold">{e.platform}</p>,
    },
    {
      align: 'center',
      key: 'order_status',
      headerTitle: t('order_status'),
      layouts: (e: IResListOrder) => <p className="font-semibold">{e.status}</p>,
    },
    {
      align: 'center',
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
        <div className={'grid gap-4 grid-cols-2'}>
          {page.dataDetail &&
            page.dataDetail.menu_list.map((item, i) => (
              <div key={i} className={'border aspect-video bg-contain  '} style={{ background: `URL(${item.image})` }}>
                <div className={'h-full w-full flex items-end p-3 bg-gradient-to-t from-black/90 to-transparent '}>
                  <div className={'flex items-center text-white gap-4 justify-between w-full'}>
                    <p>{item.name}</p>
                    <p className={'font-semibold'}>x{item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
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
