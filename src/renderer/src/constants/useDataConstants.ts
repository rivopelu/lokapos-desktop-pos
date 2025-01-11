import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';
import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ORDER_TYPE_ENUM } from '@renderer/enums/order-type-enum';
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

  const orderPlatformList: ILabelValue<ORDER_PLATFORM_ENUM>[] = [
    {
      label: 'Store',
      value: ORDER_PLATFORM_ENUM.STORE,
    },
    {
      label: 'Go Food',
      value: ORDER_PLATFORM_ENUM.GO_FOOD,
    },
    {
      label: 'Grab Food',
      value: ORDER_PLATFORM_ENUM.GRAB_FOOD,
    },
    {
      label: 'Shopee Food',
      value: ORDER_PLATFORM_ENUM.SHOPEE_FOOD,
    },
  ];

  const orderTypeList: ILabelValue<ORDER_TYPE_ENUM>[] = [
    {
      label: t('dine_in'),
      value: ORDER_TYPE_ENUM.DINE_IN,
    },
    {
      label: t('take_away'),
      value: ORDER_TYPE_ENUM.TAKE_AWAY,
    },
  ];

  return { paymentMethodData, orderPlatformList, orderTypeList };
}
