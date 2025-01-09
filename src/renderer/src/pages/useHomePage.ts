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

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [listCategory, setListCategory] = useState<IResListCategory[]>([]);
  const [dataMenu, setDataMenu] = useState<IResListMenu[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<IResListMenu[]>([]);
  const [qrisUrl, setQrisUrl] = useState<string | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  function onSubmitCreateOrder() {
    if (selectedMenuList.length >= 1) {
      setLoadingSubmit(true);
      const data: IReqCreateOrder = {
        payment_method: ORDER_PAYMENT_METHOD_ENUM.QRIS,
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
            setQrisUrl(res.data.response_data.qris_url);
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
  return {
    dataMenu,
    listCategory,
    onSelectCategory,
    selectedCategory,
    onSelectMenu,
    selectedMenuList,
    onSubmitCreateOrder,
    qrisUrl,
    loadingSubmit,
    setQrisUrl,
  };
}
