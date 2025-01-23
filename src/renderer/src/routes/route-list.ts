import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { SignInPage } from '@renderer/pages/SignInPage';
import { ROUTES } from './routes';
import { jsx } from '@emotion/react';
import { HomePage } from '@renderer/pages/HomePage';
import { OrderPage } from '@renderer/pages/OrderPage';
import Element = jsx.JSX.Element;
import { HistoryPage } from '@renderer/pages/HistoryPage';
import { ProfilePage } from '@renderer/pages/ProfilePage';

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
    type: PAGE_TYPE_ENUM.PRIMARY,
  },
];
