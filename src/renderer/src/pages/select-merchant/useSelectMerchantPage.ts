import { useEffect, useState } from 'react';
import { ILabelValue } from '@renderer/models/feature-type-interface';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { MasterDataAction } from '@renderer/redux/actions/master-data.action';
import { IMasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { HttpService } from '@renderer/service/http.service';
import ErrorService from '@renderer/service/error.service';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { ROUTES } from '@renderer/routes/routes';

export function useSelectMerchantPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const masterDataAction = new MasterDataAction();
  const accountAction = new AccountAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const MasterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [listMerchant, setListMerchant] = useState<ILabelValue<string>[]>([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(masterDataAction.getListMerchant()).then();
  }, []);

  useEffect(() => {
    if (MasterData.listMerchants?.data) {
      setListMerchant(
        MasterData.listMerchants.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        }),
      );
    }
  }, [MasterData?.listMerchants?.data]);

  function onSubmit() {
    if (selectedMerchantId) {
      setLoadingSubmit(true);
      httpService
        .PATCH(ENDPOINT.SELECT_MERCHANT(selectedMerchantId))
        .then(() => {
          dispatch(accountAction.getMe()).then();
          navigate(ROUTES.HOME());
          setLoadingSubmit(false);
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    }
  }

  return { listMerchant, selectedMerchantId, setSelectedMerchantId, onSubmit, loadingSubmit };
}
