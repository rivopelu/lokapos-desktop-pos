import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { useEffect, useState } from 'react';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { IResListAccount } from '@renderer/models/response/IResListAccount';
import { HttpService } from '@renderer/service/http.service';
import ErrorService from '@renderer/service/error.service';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { useNavigate } from 'react-router-dom';
import { UiServices } from '@renderer/service/ui.service';
import { t } from 'i18next';

export function useStartShiftPage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accountAction = new AccountAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();

  const loadingGetListAccount = Account?.listAccountsForShift?.loading;

  const [accountList, setAccountList] = useState<IResListAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>('');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (Account.listAccountsForShift?.data) {
      setAccountList(Account.listAccountsForShift.data);
    }
  }, [Account?.listAccountsForShift?.data]);

  useEffect(() => {
    dispatch(accountAction.getListAccountForShift()).then();
  }, []);

  function onChangeSelect(e?: string) {
    if (e) {
      if (selectedAccountId.find((v) => v === e)) {
        setSelectedAccountId((value) => value.filter((v) => v !== e));
      } else {
        setSelectedAccountId((value) => [...value, e]);
      }
    }
  }

  function onSearchChange(e?: string) {
    setSearchValue(e ?? '');
  }

  function filterList() {
    return [...accountList].filter((e) =>
      e.full_name.toUpperCase().includes(searchValue ? searchValue.toUpperCase() : ''),
    );
  }

  function onSubmit() {
    if (selectedAccountId.length > 0) {
      const data = {
        account_ids: selectedAccountId,
      };
      httpService
        .POST(ENDPOINT.START_SHIFT(), data)
        .then(() => {
          setLoadingSubmit(false);
          dispatch(accountAction.getMe()).then();
          navigate(-1);
          uiService.handleSnackbarSuccess(t('shift_is_started'));
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    }
  }

  return {
    onChangeSelect,
    selectedAccountId,
    accountList,
    loadingGetListAccount,
    onSearchChange,
    searchValue,
    filterList,
    loadingSubmit,
    onSubmit,
  };
}
