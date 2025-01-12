import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions';
import { OrderSlice } from '../reducers/order.reducer';
import { ENDPOINT } from '@renderer/constants/endpoint';
import { BaseResponsePaginated } from '@renderer/models/response/IResModel';
import { IResListOrder } from '@renderer/models/response/IResListOrder';

export class OrderAction extends BaseActions {
  private action = OrderSlice.actions;

  getListOrder(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getListOrder({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_ORDER(param))
        .then((res: BaseResponsePaginated<IResListOrder[]>) => {
          dispatch(
            this.action.getListOrder({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getListOrder({ loading: false, data: undefined }));
        });
    };
  }
}
