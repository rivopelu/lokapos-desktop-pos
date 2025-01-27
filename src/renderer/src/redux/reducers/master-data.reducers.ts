import { BasePayload, IPayloadData } from '@renderer/models/response/IResModel';
import { IResListCategory } from '@renderer/models/response/IResListCategory';
import { createSlice } from '@reduxjs/toolkit';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { IResListMerchant } from '@renderer/models/response/IResListMerchant';

export interface IMasterDataSlice {
  listCategories?: IPayloadData<IResListCategory[]>;
  listMenu?: IPayloadData<IResListMenu[]>;
  listMerchants?: IPayloadData<IResListMerchant[]>;
}

const initState: IMasterDataSlice = {};

export const MasterDataSlice = createSlice({
  initialState: initState,
  name: 'master-data',
  reducers: {
    getCategory: (state: IMasterDataSlice, action: BasePayload<IResListCategory[]>) => {
      state.listCategories = action.payload;
    },
    getMenu: (state: IMasterDataSlice, action: BasePayload<IResListMenu[]>) => {
      state.listMenu = action.payload;
    },
    getListMerchant: (state: IMasterDataSlice, action: BasePayload<IResListMerchant[]>) => {
      state.listMerchants = action.payload;
    },
  },
});
