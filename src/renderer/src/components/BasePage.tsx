import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { ReactNode, useEffect } from 'react';
import { TopBar } from './TopBar';
import { useAppDispatch, useAppSelector } from '@renderer/redux/store';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@renderer/routes/routes';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';

export function BasePage(props: IProps) {
  const dispatch = useAppDispatch();
  const accountAction = new AccountAction();
  const location = useLocation();
  const navigate = useNavigate();
  const Account: IAccountSlice = useAppSelector((state) => state.Account);

  useEffect(() => {
    if (location?.pathname !== ROUTES.SIGN_IN()) {
      dispatch(accountAction.getMe()).then();
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== ROUTES.SELECT_MERCHANT() && Account.getMe?.data && !Account.getMe.data.merchant_id) {
      navigate(ROUTES.SELECT_MERCHANT());
    }
  }, [Account?.getMe?.data]);

  if (props.type === PAGE_TYPE_ENUM.PRIMARY) {
    return (
      <div>
        <TopBar />
        <div>{props.children}</div>
      </div>
    );
  } else {
    return <>{props.children}</>;
  }
}

interface IProps {
  type: PAGE_TYPE_ENUM;
  children: ReactNode;
}
