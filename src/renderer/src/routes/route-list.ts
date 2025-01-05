import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { SignInPage } from '@renderer/pages/SignInPage';
import { ROUTES } from './routes';
import { jsx } from '@emotion/react';
import Element = jsx.JSX.Element;
import { HomePage } from '@renderer/pages/HomePage';

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
];
