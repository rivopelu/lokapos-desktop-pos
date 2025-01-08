import BaseActions from '@renderer/redux/base-actions';
import { MasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { Dispatch } from '@reduxjs/toolkit';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { BaseResponse } from '@renderer/models/response/IResModel';
import { IResListCategory } from '@renderer/models/response/IResListCategory';

export class MasterDataAction extends BaseActions {
  private action = MasterDataSlice.actions;

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
}
