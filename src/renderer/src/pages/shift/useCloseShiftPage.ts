import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { MasterDataAction } from '@renderer/redux/actions/master-data.action';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useEffect, useState } from 'react';
import { IResAccountDetailShift, IResDetailShift } from '@renderer/models/response/IResDetailShift';
import { IMasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { differenceInSeconds } from 'date-fns';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { t } from 'i18next';
import { HttpService } from '@renderer/service/http.service';
import ErrorService from '@renderer/service/error.service';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { UiServices } from '@renderer/service/ui.service';
import { useNavigate } from 'react-router-dom';

export function useCloseShiftPage() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const loadingDetail = MasterData.detailShift?.loading;
  const shiftStart = Account?.getMe?.data?.start_shift_date;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const masterDataAction = new MasterDataAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const accountAction = new AccountAction();
  const uiService = new UiServices();

  const [dataDetail, setDataDetail] = useState<IResDetailShift | undefined>();
  const [dataAccount, setDataAccount] = useState<IResAccountDetailShift[]>([]);
  const [elapsedTime, setElapsedTime] = useState<string | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (!shiftStart) return;
    const interval = setInterval(() => {
      const diff = differenceInSeconds(new Date(), shiftStart);
      const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [shiftStart]);

  useEffect(() => {
    if (Account?.getMe?.data?.shift_id) {
      dispatch(masterDataAction.getDetailShift(Account?.getMe?.data?.shift_id)).then();
    }
  }, [Account?.getMe?.data?.shift_id]);

  useEffect(() => {
    setDataDetail(MasterData?.detailShift?.data);
  }, [MasterData?.detailShift?.data]);

  useEffect(() => {
    if (dataDetail?.account) {
      setDataAccount(dataDetail.account);
    }
  }, [dataDetail]);

  function onSubmit() {
    setLoadingSubmit(true);
    httpService
      .PATCH(ENDPOINT.CLOSE_SHIFT())
      .then(() => {
        setLoadingSubmit(false);
        dispatch(accountAction.getMe()).then();
        navigate(-1);
        uiService.handleSnackbarSuccess(t('your_shift_is_successfully_closed'));
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoadingSubmit(false);
      });
  }

  return {
    dataDetail,
    loadingDetail,
    dataAccount,
    elapsedTime,
    onSubmit,
    loadingSubmit,
  };
}
