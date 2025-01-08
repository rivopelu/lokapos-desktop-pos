import { AccountSlice } from './reducers/account.reducer';
import { MasterDataSlice } from '@renderer/redux/reducers/master-data.reducers';

export const combineReducers: any = {
  Account: AccountSlice.reducer,
  MasterData: MasterDataSlice.reducer,
};
