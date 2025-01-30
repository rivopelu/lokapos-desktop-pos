import { ReactNode } from 'react';

export function MainCard(props: IProps) {
  return <div className={` border ${props.className} bg-white`}>{props.children}</div>;
}

export function CardBody(props: IProps) {
  return <div className={`p-6 ${props.className}`}>{props.children}</div>;
}
interface IProps {
  children: ReactNode;
  className?: string;
}
