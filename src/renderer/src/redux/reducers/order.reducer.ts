import { createSlice } from '@reduxjs/toolkit';
import { IResListOrder } from '@renderer/models/response/IResListOrder';
import { BasePayloadPaginated, IPayloadDataPaginated } from '@renderer/models/response/IResModel';

export interface IOrderSlice {
  listOrder?: IPayloadDataPaginated<IResListOrder[]>;
}

const initState: IOrderSlice = {};

export const OrderSlice = createSlice({
  initialState: initState,
  name: 'order',
  reducers: {
    getListOrder: (state: IOrderSlice, action: BasePayloadPaginated<IResListOrder[]>) => {
      state.listOrder = action.payload;
    },
  },
});
