import { BasePayload, IPayloadData } from '@renderer/models/response/IResModel';
import { IResListCategory } from '@renderer/models/response/IResListCategory';
import { createSlice } from '@reduxjs/toolkit';

export interface IMasterDataSlice {
  listCategories?: IPayloadData<IResListCategory[]>;
}

const initState: IMasterDataSlice = {};

export const MasterDataSlice = createSlice({
  initialState: initState,
  name: 'master-data',
  reducers: {
    getCategory: (state: IMasterDataSlice, action: BasePayload<IResListCategory[]>) => {
      state.listCategories = action.payload;
    },
  },
});
