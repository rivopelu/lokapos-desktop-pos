import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { SignInPage } from '@renderer/pages/sign-in/SignInPage';
import { ROUTES } from './routes';
import { jsx } from '@emotion/react';
import { HomePage } from '@renderer/pages/home/HomePage';
import { OrderPage } from '@renderer/pages/order/OrderPage';
import Element = jsx.JSX.Element;
import { HistoryPage } from '@renderer/pages/HistoryPage';
import { ProfilePage } from '@renderer/pages/profile/ProfilePage';
import { SelectMerchantPage } from '@renderer/pages/select-merchant/SelectMerchantPage';
import { StartShiftPage } from '@renderer/pages/shift/StartShiftPage';

interface IRouteList {
  elements: () => Element;
  route: string;
  type: PAGE_TYPE_ENUM;
}

export const routeList: IRouteList[] = [
  {
    elements: SignInPage,
    route: ROUTES.SIGN_IN(),
    type: PAGE_TYPE_ENUM.FULL_PAGE,
  },
  {
    elements: HomePage,
    route: ROUTES.HOME(),
    type: PAGE_TYPE_ENUM.PRIMARY,
  },
  {
    elements: OrderPage,
    route: ROUTES.ORDER(),
    type: PAGE_TYPE_ENUM.PRIMARY,
  },
  {
    elements: HistoryPage,
    route: ROUTES.HISTORY(),
    type: PAGE_TYPE_ENUM.PRIMARY,
  },
  {
    elements: ProfilePage,
    route: ROUTES.PROFILE(),
    type: PAGE_TYPE_ENUM.SECONDARY,
  },

  {
    elements: SelectMerchantPage,
    route: ROUTES.SELECT_MERCHANT(),
    type: PAGE_TYPE_ENUM.FULL_PAGE,
  },

  {
    elements: StartShiftPage,
    route: ROUTES.START_SHIFT(),
    type: PAGE_TYPE_ENUM.SECONDARY,
  },
];
