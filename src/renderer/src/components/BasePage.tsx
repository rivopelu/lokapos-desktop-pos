import { PAGE_TYPE_ENUM } from '@renderer/enums/page-type-enum';
import { ReactNode } from 'react';
import { Topbar } from './Topbar';

export function BasePage(props: IProps) {
  if (props.type === PAGE_TYPE_ENUM.PRIMARY) {
    return (
      <div>
        <Topbar />
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
