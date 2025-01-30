import { ORDER_STATUS_ENUM } from '@renderer/enums/order-status-enum';
import { TextHelper } from '@renderer/helper/text-helper';

export function OrderStatusText(props: IProps) {
  const textHelper = new TextHelper();
  switch (props.text) {
    case ORDER_STATUS_ENUM.ON_PROGRESS:
      return <span className={'uppercase font-semibold text-blue-700'}>{textHelper.parseTextEnum(props.text)}</span>;
    case ORDER_STATUS_ENUM.PENDING:
      return <span className={'uppercase font-semibold text-yellow-700'}>{textHelper.parseTextEnum(props.text)}</span>;
    case ORDER_STATUS_ENUM.COMPLETED:
      return <span className={'uppercase font-semibold text-green-700'}>{textHelper.parseTextEnum(props.text)}</span>;
    default:
      return <span className={'uppercase font-semibold '}>{textHelper.parseTextEnum(props.text)}</span>;
  }
}

interface IProps {
  text: ORDER_STATUS_ENUM;
}
