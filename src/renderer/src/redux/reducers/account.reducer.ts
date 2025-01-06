import { createSlice } from '@reduxjs/toolkit';
import { IResGetMe } from '@renderer/models/response/IResGetMe';
import { BasePayload, IPayloadData } from '@renderer/models/response/IResModel';

export interface IAccountSlice {
  getMe?: IPayloadData<IResGetMe>;
}

const initState: IAccountSlice = {};

export const AccountSlice = createSlice({
  initialState: initState,
  name: 'account',
  reducers: {
    getMe: (state: IAccountSlice, action: BasePayload<IResGetMe>) => {
      state.getMe = action.payload;
    },
  },
});
