import { ENDPOINT } from '@renderer/constants/endpoint';
import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';
import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ORDER_TYPE_ENUM } from '@renderer/enums/order-type-enum';
import { IReqCreateOrder } from '@renderer/models/request/IReqCreateOrder';
import { IResCheckOrderPaymentStatus } from '@renderer/models/response/IResCheckOrderPaymentStatus';
import { IResCreateOrder } from '@renderer/models/response/IResCreateOrder';
import { IResListCategory } from '@renderer/models/response/IResListCategory';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { BaseResponse } from '@renderer/models/response/IResModel';
import { MasterDataAction } from '@renderer/redux/actions/master-data.action';
import { IMasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import ErrorService from '@renderer/service/error.service';
import { HttpService } from '@renderer/service/http.service';
import { UiServices } from '@renderer/service/ui.service';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ORDER_PAYMENT_STATUS_ENUM } from '@renderer/enums/order-payment-status-enum';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();
  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const Account: IAccountSlice = useAppSelector((state) => state.Account);

  const loadingListCategory = MasterData?.listCategories?.loading;
  const loadingDataMenu = MasterData.listMenu?.loading;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [listCategory, setListCategory] = useState<IResListCategory[]>([]);
  const [dataMenu, setDataMenu] = useState<IResListMenu[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<IResListMenu[]>([]);
  const [responseCreateOrder, setResponseCreateOrder] = useState<IResCreateOrder | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingCheckStatusOrder, setLoadingCheckStatusOrder] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<ORDER_PAYMENT_METHOD_ENUM | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<ORDER_PLATFORM_ENUM | undefined>();
  const [selectedOrderType, setSelectedOrderType] = useState<ORDER_TYPE_ENUM | undefined>();
  const [showModalOrder, setShowModalOrder] = useState<boolean>(false);
  const [showModalShift, setShowModalShift] = useState<boolean>(false);

  const [dataTotal, setDataTotal] = useState({
    item: 0,
    price: 0,
  });

  useEffect(() => {
    setShowModalShift(!Account?.getMe?.data?.is_active_shift);
  }, [Account?.getMe?.data]);

  function onCloseModalShift() {
    setShowModalShift(false);
  }

  function onSubmitModalOrder() {
    onSubmitCreateOrder();
  }

  function onSubmitCreateOrder() {
    if (selectedMenuList.length >= 1 && selectedPaymentMethod && selectedPlatform && selectedOrderType) {
      setLoadingSubmit(true);
      const data: IReqCreateOrder = {
        payment_method: selectedPaymentMethod,
        platform: selectedPlatform,
        type: selectedOrderType,
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
          setShowModalOrder(false);
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
          if (res.data.response_data.payment_status === ORDER_PAYMENT_STATUS_ENUM.SUCCESS) {
            onSuccessCreateOrder();
          }
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
    return !(selectedMenuList.length !== 0);
  }

  function onSuccessCreateOrder() {
    setSelectedMenuList([]);
    setResponseCreateOrder(undefined);
    setSelectedPaymentMethod(undefined);
    setSelectedPlatform(undefined);
    setSelectedOrderType(undefined);
    setDataTotal({
      item: 0,
      price: 0,
    });
    uiService.handleSnackbarSuccess(t('order_success_created'));
  }

  function onCloseModalOrder() {
    setShowModalOrder(false);
  }

  function checkButtonModalDisable() {
    return !(selectedPlatform && selectedOrderType && selectedPaymentMethod);
  }

  function onAddItem(e: IResListMenu) {
    setSelectedMenuList((prevSelected) => {
      const productIndex = prevSelected.findIndex((product) => product.id === e.id);

      if (productIndex !== -1) {
        return prevSelected.map((product, index) =>
          index === productIndex ? { ...product, qty: (product?.qty ? product.qty : 0) + 1 } : product,
        );
      } else {
        return [...prevSelected, { ...e, qty: 1 }];
      }
    });
  }

  function onMinItem(e: IResListMenu) {
    setSelectedMenuList((prevSelected) => {
      const productIndex = prevSelected.findIndex((product) => product.id === e.id);

      if (productIndex !== -1) {
        return prevSelected
          .map((product, index) => (index === productIndex ? { ...product, qty: (product?.qty || 1) - 1 } : product))
          .filter((product) => product.qty && product.qty > 0);
      }

      return prevSelected;
    });
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
    setShowModalOrder,
    showModalOrder,
    onCloseModalOrder,
    setSelectedPlatform,
    setSelectedOrderType,
    selectedOrderType,
    selectedPlatform,
    onSubmitModalOrder,
    loadingListCategory,
    loadingDataMenu,
    checkButtonModalDisable,
    onAddItem,
    onMinItem,
    onCloseModalShift,
    showModalShift,
  };
}
