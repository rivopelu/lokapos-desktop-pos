import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ILabelValue } from '@renderer/models/feature-type-interface';
import { t } from 'i18next';

export function useDataConstants() {
  const paymentMethodData: ILabelValue<ORDER_PAYMENT_METHOD_ENUM>[] = [
    {
      label: t('cash'),
      value: ORDER_PAYMENT_METHOD_ENUM.CASH,
    },
    {
      label: t('qris'),
      value: ORDER_PAYMENT_METHOD_ENUM.QRIS,
    },
  ];

  return { paymentMethodData };
}
