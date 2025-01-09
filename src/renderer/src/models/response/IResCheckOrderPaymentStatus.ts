import { ORDER_PAYMENT_STATUS_ENUM } from '@renderer/enums/order-payment-status-enum';

export interface IResCheckOrderPaymentStatus {
  payment_status: ORDER_PAYMENT_STATUS_ENUM;
}
