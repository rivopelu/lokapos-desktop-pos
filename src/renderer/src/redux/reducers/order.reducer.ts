import { createSlice } from '@reduxjs/toolkit';
import { IResDetailOrder } from '@renderer/models/response/IResDetailOrder';
import { IResListOrder } from '@renderer/models/response/IResListOrder';
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from '@renderer/models/response/IResModel';

export interface IOrderSlice {
  listOrder?: IPayloadDataPaginated<IResListOrder[]>;
  detailOrder?: IPayloadData<IResDetailOrder>;
}

const initState: IOrderSlice = {};

export const OrderSlice = createSlice({
  initialState: initState,
  name: 'order',
  reducers: {
    getListOrder: (state: IOrderSlice, action: BasePayloadPaginated<IResListOrder[]>) => {
      state.listOrder = action.payload;
    },
    getDetailOrder: (state: IOrderSlice, action: BasePayload<IResDetailOrder>) => {
      state.detailOrder = action.payload;
    },
  },
});
