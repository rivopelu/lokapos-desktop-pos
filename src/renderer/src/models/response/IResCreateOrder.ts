import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';

export interface IResCreateOrder {
  qris_url: ORDER_PAYMENT_METHOD_ENUM;
  payment_method: string;
}
