import { ORDER_STATUS_ENUM } from '@renderer/enums/order-status-enum';
import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';

export interface IResListOrder {
  id: string;
  status: ORDER_STATUS_ENUM;
  payment_status: string;
  total_order: number;
  total_item: number;
  code: number;
  platform: ORDER_PLATFORM_ENUM;
  type: string;
  payment_method: string;
}
