import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';

export interface IReqCreateOrder {
  payment_method: ORDER_PAYMENT_METHOD_ENUM;
  menu_list : IReqMenuListCreateOrder[]
}

export interface IReqMenuListCreateOrder {
  menu_id: string;
  quantity: number;
  note?: string;
}
