export interface IResDetailOrder {
  id: string;
  status: string;
  payment_status: string;
  total_order: number;
  total_item: number;
  code: number;
  platform: string;
  type: string;
  payment_method: string;
  menu_list: IResDetailOrderListMenu[];
}

export interface IResDetailOrderListMenu {
  name: string;
  id: string;
  image: string;
  quantity: number;
}
