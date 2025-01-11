import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';
import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ORDER_TYPE_ENUM } from '@renderer/enums/order-type-enum';

export interface IReqCreateOrder {
  payment_method: ORDER_PAYMENT_METHOD_ENUM;
  platform: ORDER_PLATFORM_ENUM;
  type: ORDER_TYPE_ENUM;
  menu_list: IReqMenuListCreateOrder[];
}

export interface IReqMenuListCreateOrder {
  menu_id: string;
  quantity: number;
  note?: string;
}
