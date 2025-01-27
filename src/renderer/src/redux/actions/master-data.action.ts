import BaseActions from '@renderer/redux/base-actions';
import { MasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { Dispatch } from '@reduxjs/toolkit';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { BaseResponse } from '@renderer/models/response/IResModel';
import { IResListCategory } from '@renderer/models/response/IResListCategory';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { IResListMerchant } from '@renderer/models/response/IResListMerchant';

export class MasterDataAction extends BaseActions {
  private action = MasterDataSlice.actions;

  getMenu() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getMenu({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.GET_LIST_MENU())
        .then((res: BaseResponse<IResListMenu[]>) => {
          dispatch(this.action.getMenu({ data: res.data.response_data, loading: false }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getMenu({ loading: false, data: undefined }));
        });
    };
  }

  getCategory() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getCategory({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_CATEGORIES())
        .then((res: BaseResponse<IResListCategory[]>) => {
          dispatch(this.action.getCategory({ data: res.data.response_data, loading: false }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getCategory({ loading: false, data: undefined }));
        });
    };
  }

  getListMerchant() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getListMerchant({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.LIST_MERCHANT())
        .then((res: BaseResponse<IResListMerchant[]>) => {
          dispatch(this.action.getListMerchant({ data: res.data.response_data, loading: false }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getListMerchant({ loading: false, data: undefined }));
        });
    };
  }
}
