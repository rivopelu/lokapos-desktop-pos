import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { ReactNode, useEffect } from 'react';
import { TopBar } from './TopBar';
import { useAppDispatch } from '@renderer/redux/store';
import { AccountAction } from '@renderer/redux/actions/account.actions';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@renderer/routes/routes';

export function BasePage(props: IProps) {
  const dispatch = useAppDispatch();
  const accountAction = new AccountAction();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname !== ROUTES.SIGN_IN()) {
      dispatch(accountAction.getMe()).then();
    }
  }, []);

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
