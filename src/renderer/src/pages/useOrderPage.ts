import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { OrderAction } from '@renderer/redux/actions/order.actions';
import { IOrderSlice } from '@renderer/redux/reducers/order.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';
import { IResDetailOrder } from '@renderer/models/response/IResDetailOrder';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { HttpService } from '@renderer/service/http.service';
import ErrorService from '@renderer/service/error.service';

export function useOrderPage() {
  const [dataList, setDataList] = useState<IResListOrder[]>([]);
  const [loadingReadyOrder, setLoadingReadyOrder] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const httpService = new HttpService();
  const orderAction = new OrderAction();
  const errorService = new ErrorService();

  const Order: IOrderSlice = useAppSelector((state) => state.Order);
  const loading = Order?.listOrder?.loading;
  const loadingDetail = Order?.detailOrder?.loading;

  const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<IResDetailOrder | undefined>();

  useEffect(() => {
    if (Order?.listOrder?.data) {
      setDataList(Order?.listOrder?.data);
    }
  }, [Order?.listOrder?.data]);

  useEffect(() => {
    setDataDetail(Order?.detailOrder?.data);
  }, [Order?.detailOrder?.data]);

  function fetchData(loading?: boolean) {
    dispatch(orderAction.getListOrder(undefined, loading)).then();
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
    fetchData(true);
  }, []);

  function onReadyOrder() {
    if (dataDetail?.id) {
      setLoadingReadyOrder(true);

      httpService
        .PATCH(ENDPOINT.READY_ORDER(dataDetail?.id))
        .then(() => {
          setLoadingReadyOrder(false);
          setShowModalDetail(false);
          fetchData();
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingReadyOrder(false);
        });
    }
  }

  return {
    dataList,
    loading,
    onClickDetail,
    setShowModalDetail,
    showModalDetail,
    onReadyOrder,
    loadingReadyOrder,
    loadingDetail,
    dataDetail,
    onCloseModalDetail,
  };
}
