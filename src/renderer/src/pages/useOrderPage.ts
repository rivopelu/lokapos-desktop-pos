import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { OrderAction } from '@renderer/redux/actions/order.actions';
import { IOrderSlice } from '@renderer/redux/reducers/order.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';

export function useOrderPage() {
  const [dataList, setDataList] = useState<IResListOrder[]>([]);

  const dispatch = useAppDispatch();
  const orderAction = new OrderAction();

  const Order: IOrderSlice = useAppSelector((state) => state.Order);
  const loading = Order?.listOrder?.loading;

  useEffect(() => {
    setDataList(Order?.listOrder?.data || []);
  }, [Order?.listOrder?.data]);

  function fetchData() {
    dispatch(orderAction.getListOrder()).then();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { dataList, loading };
}
