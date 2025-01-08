import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { useEffect, useState } from 'react';
import { dummyListMenu, IResListMenu } from '@renderer/models/response/IResListMenu';
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
  const [dataMenu] = useState<IResListMenu[]>(dummyListMenu);

  useEffect(() => {
    console.log(Account?.getMe?.data);
  }, [Account?.getMe]);

  useEffect(() => {
    dispatch(masterDataAction.getCategory()).then();
  }, []);

  useEffect(() => {
    setListCategory(MasterData?.listCategories?.data || []);
  }, [MasterData?.listCategories?.data]);

  function onSelectCategory(e: IResListCategory) {
    if (selectedCategory === e.id) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(e.id);
    }
  }

  return { dataMenu, listCategory, onSelectCategory, selectedCategory };
}
