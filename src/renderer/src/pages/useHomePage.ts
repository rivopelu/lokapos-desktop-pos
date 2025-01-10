import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { MasterDataAction } from '@renderer/redux/actions/master-data.action';
import { IMasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { IResListCategory } from '@renderer/models/response/IResListCategory';
import { HttpService } from '@renderer/service/http.service';
import ErrorService from '@renderer/service/error.service';
import { IReqCreateOrder } from '@renderer/models/request/IReqCreateOrder';
import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { BaseResponse } from '@renderer/models/response/IResModel';
import { IResCreateOrder } from '@renderer/models/response/IResCreateOrder';
import { IResCheckOrderPaymentStatus } from '@renderer/models/response/IResCheckOrderPaymentStatus';
import { UiServices } from '@renderer/service/ui.service';
import { t } from 'i18next';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [listCategory, setListCategory] = useState<IResListCategory[]>([]);
  const [dataMenu, setDataMenu] = useState<IResListMenu[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<IResListMenu[]>([]);
  const [responseCreateOrder, setResponseCreateOrder] = useState<IResCreateOrder | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingCheckStatusOrder, setLoadingCheckStatusOrder] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<ORDER_PAYMENT_METHOD_ENUM | undefined>();

  const [dataTotal, setDataTotal] = useState({
    item: 0,
    price: 0,
  });

  function onSubmitCreateOrder() {
    if (selectedMenuList.length >= 1 && selectedPaymentMethod) {
      setLoadingSubmit(true);
      const data: IReqCreateOrder = {
        payment_method: selectedPaymentMethod,
        menu_list: selectedMenuList.map((e) => {
          return {
            menu_id: e.id,
            quantity: e?.qty || 0,
            note: '',
          };
        }),
      };
      httpService
        .POST(ENDPOINT.CREATE_ORDER(), data)
        .then((res: BaseResponse<IResCreateOrder>) => {
          setLoadingSubmit(false);
          if (res.data.response_data.payment_method === ORDER_PAYMENT_METHOD_ENUM.QRIS) {
            setResponseCreateOrder(res.data.response_data);
          } else {
            onSuccessCreateOrder();
          }
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    }
  }

  useEffect(() => {
    console.log(Account?.getMe?.data);
  }, [Account?.getMe]);

  useEffect(() => {
    dispatch(masterDataAction.getCategory()).then();
    dispatch(masterDataAction.getMenu()).then();
  }, []);

  useEffect(() => {
    setListCategory(MasterData?.listCategories?.data || []);
  }, [MasterData?.listCategories?.data]);

  useEffect(() => {
    if (MasterData?.listMenu?.data) {
      const data = MasterData.listMenu.data;
      if (selectedCategory) {
        setDataMenu(data.filter((e) => e.category_id === selectedCategory));
      } else {
        setDataMenu(data);
      }
    }
  }, [MasterData?.listMenu?.data, selectedCategory]);

  function onSelectCategory(e: IResListCategory) {
    if (selectedCategory === e.id) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(e.id);
    }
  }

  useEffect(() => {
    let transaction = 0;
    let totalItem = 0;
    selectedMenuList.map((item) => {
      transaction = transaction + item.price * (item.qty || 1);
      totalItem = totalItem + (item.qty || 0);
    });
    setDataTotal({
      item: totalItem,
      price: transaction,
    });
  }, [selectedMenuList]);

  function onCheckStatusOrder() {
    if (responseCreateOrder?.order_id) {
      setLoadingCheckStatusOrder(true);
      httpService
        .GET(ENDPOINT.CHECK_STATUS_ORDER(responseCreateOrder.order_id))
        .then((res: BaseResponse<IResCheckOrderPaymentStatus>) => {
          setLoadingCheckStatusOrder(false);
          setResponseCreateOrder({
            ...responseCreateOrder,
            payment_status: res.data.response_data.payment_status,
          });
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingCheckStatusOrder(false);
        });
    }
  }

  function onCloseCheckOrderStatus() {
    onSuccessCreateOrder();
  }

  function onSelectMenu(e: IResListMenu) {
    const findData = selectedMenuList.find((value) => value.id === e.id);

    if (findData) {
      const filterData: IResListMenu[] = selectedMenuList.filter((v) => v.id != e.id);
      const newData: IResListMenu = {
        ...findData,
        qty: (findData?.qty || 0) + 1,
      };
      setSelectedMenuList([newData, ...filterData]);
    } else {
      const newData: IResListMenu = {
        ...e,
        qty: 1,
      };
      setSelectedMenuList((v) => [newData, ...v]);
    }
  }

  function checkDisableButtonOrder(): boolean {
    return !(selectedMenuList.length !== 0 && selectedPaymentMethod);
  }

  function onSuccessCreateOrder() {
    setSelectedMenuList([]);
    setResponseCreateOrder(undefined);
    setSelectedPaymentMethod(undefined);
    setDataTotal({
      item: 0,
      price: 0,
    });
    uiService.handleSnackbarSuccess(t('order_success_created'));
  }

  return {
    dataMenu,
    listCategory,
    onSelectCategory,
    selectedCategory,
    onSelectMenu,
    selectedMenuList,
    onSubmitCreateOrder,
    responseCreateOrder,
    loadingSubmit,
    loadingCheckStatusOrder,
    dataTotal,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
    setResponseCreateOrder,
    onCheckStatusOrder,
    checkDisableButtonOrder,
    onCloseCheckOrderStatus,
  };
}
