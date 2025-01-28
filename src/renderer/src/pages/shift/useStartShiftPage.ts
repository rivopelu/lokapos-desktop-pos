import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { useEffect, useState } from 'react';
import { ILabelValue } from '@renderer/models/feature-type-interface';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';

export function useStartShiftPage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const dispatch = useAppDispatch();

  const accountAction = new AccountAction();
  const loadingGetListAccount = Account?.listAccountsForShift?.loading;

  const [accountList, setAccountList] = useState<ILabelValue<string>[]>([]);

  useEffect(() => {
    if (Account.listAccountsForShift?.data) {
      setAccountList(
        Account.listAccountsForShift.data.map((item) => {
          return {
            value: item.id,
            label: item.full_name,
          };
        }),
      );
    }
  }, [Account?.listAccountsForShift?.data]);

  useEffect(() => {
    dispatch(accountAction.getListAccountForShift()).then();
  }, []);

  return {
    accountList,
    loadingGetListAccount,
  };
}
