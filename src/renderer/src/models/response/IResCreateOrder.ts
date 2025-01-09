import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ORDER_PAYMENT_STATUS_ENUM } from '@renderer/enums/order-payment-status-enum';

export interface IResCreateOrder {
  qris_url: string;
  payment_method: ORDER_PAYMENT_METHOD_ENUM;
  payment_status : ORDER_PAYMENT_STATUS_ENUM
  order_id: string;
}
