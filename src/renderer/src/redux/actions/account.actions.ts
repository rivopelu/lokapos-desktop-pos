import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions';
import { AccountSlice } from '../reducers/account.reducer';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { BaseResponse } from '@renderer/models/response/IResModel';
import { IResGetMe } from '@renderer/models/response/IResGetMe';

export class AccountAction extends BaseActions {
  private action = AccountSlice.actions;

  getMe() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getMe({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_ME())
        .then((res: BaseResponse<IResGetMe>) => {
          dispatch(this.action.getMe({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getMe({ loading: false, data: undefined }));
        });
    };
  }
}
