import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { OrderAction } from '@renderer/redux/actions/order.actions';
import { IOrderSlice } from '@renderer/redux/reducers/order.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';
import { IResDetailOrder } from '@renderer/models/response/IResDetailOrder';

export function useOrderPage() {
  const [dataList, setDataList] = useState<IResListOrder[]>([]);

  const dispatch = useAppDispatch();
  const orderAction = new OrderAction();

  const Order: IOrderSlice = useAppSelector((state) => state.Order);
  const loading = Order?.listOrder?.loading;
  const loadingDetail = Order?.detailOrder?.loading;

  const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<IResDetailOrder | undefined>();

  useEffect(() => {
    setDataList(Order?.listOrder?.data || []);
  }, [Order?.listOrder?.data]);

  useEffect(() => {
    setDataDetail(Order?.detailOrder?.data);
  }, [Order?.detailOrder?.data]);

  function fetchData() {
    dispatch(orderAction.getListOrder()).then();
  }

  function onClickDetail(item: IResListOrder) {
    setShowModalDetail(true);
    dispatch(orderAction.getDetailOrder(item.id)).then();
  }

  function onCloseModalDetail() {
    setShowModalDetail(false);
    setTimeout(() => {
      setDataDetail(undefined);
    }, 300);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataList,
    loading,
    onClickDetail,
    setShowModalDetail,
    showModalDetail,
    loadingDetail,
    dataDetail,
    onCloseModalDetail,
  };
}
