import { IconButton } from '@mui/material';
import { ITableColumnData, MainTable } from '@renderer/components/MainTable';
import { PageContainer } from '@renderer/components/PageContainer';
import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { t } from 'i18next';
import { MdInfo } from 'react-icons/md';
import { useOrderPage } from './useOrderPage';

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
      layouts: () => (
        <div>
          <IconButton>
            <MdInfo />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="py-8">
      <PageContainer>
        <MainTable loading={page.loading} data={page.dataList} columns={tableColumn} />
      </PageContainer>
    </div>
  );
}
