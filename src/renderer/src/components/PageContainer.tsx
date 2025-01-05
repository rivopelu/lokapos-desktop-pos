import { ReactNode } from 'react';

export function PageContainer(props: IProps) {
  return <div className="px-10 mx-auto">{props.children}</div>;
}

interface IProps {
  children: ReactNode;
  className?: string;
}
