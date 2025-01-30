import { createSlice } from '@reduxjs/toolkit';
import { IResGetMe } from '@renderer/models/response/IResGetMe';
import { BasePayload, IPayloadData } from '@renderer/models/response/IResModel';
import { IResListAccount } from '@renderer/models/response/IResListAccount';

export interface IAccountSlice {
  getMe?: IPayloadData<IResGetMe>;
  listAccountsForShift?: IPayloadData<IResListAccount[]>;
}

const initState: IAccountSlice = {};

export const AccountSlice = createSlice({
  initialState: initState,
  name: 'account',
  reducers: {
    getMe: (state: IAccountSlice, action: BasePayload<IResGetMe>) => {
      state.getMe = action.payload;
    },
    listAccountForShift: (state: IAccountSlice, action: BasePayload<IResListAccount[]>) => {
      state.listAccountsForShift = action.payload;
    },
  },
});
