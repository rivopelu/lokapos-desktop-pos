import { ASSETS } from '@renderer/constants/assets';
import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';
import { BrandLogo } from '@renderer/components/BrandLogo';

export function PlatformUi(props: IProps) {
  function checkAssets() {
    switch (props.platform) {
      case ORDER_PLATFORM_ENUM.GO_FOOD:
        return ASSETS.GO_FOOD;
      case ORDER_PLATFORM_ENUM.GRAB_FOOD:
        return ASSETS.GRAB_FOOD;
      case ORDER_PLATFORM_ENUM.SHOPEE_FOOD:
        return ASSETS.SHOPEE_FOOD;
      default:
        return '';
    }
  }

  if (props.platform === 'STORE') {
    return <BrandLogo />;
  }
  return <img src={checkAssets()} alt={'Go Food'} className={'w-[100px]'} />;
}

interface IProps {
  platform: ORDER_PLATFORM_ENUM;
}
