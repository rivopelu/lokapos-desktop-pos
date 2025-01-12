import { AccountSlice } from './reducers/account.reducer';
import { MasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';
import { OrderSlice } from './reducers/order.reducer';

export const combineReducers: any = {
  Account: AccountSlice.reducer,
  MasterData: MasterDataSlice.reducer,
  Order: OrderSlice.reducer,
};
