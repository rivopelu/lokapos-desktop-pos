import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { MasterDataAction } from '@renderer/redux/actions/master-data.action';
import { IMasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { IResListCategory } from '@renderer/models/response/IResListCategory';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();

  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [listCategory, setListCategory] = useState<IResListCategory[]>([]);
  const [dataMenu, setDataMenu] = useState<IResListMenu[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<IResListMenu[]>([]);

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
  return { dataMenu, listCategory, onSelectCategory, selectedCategory, onSelectMenu, selectedMenuList };
}
