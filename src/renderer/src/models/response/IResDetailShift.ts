export interface IResDetailShift {
  id: string;
  start_date: number;
  end_date: number;
  is_active: boolean;
  account: IResAccountDetailShift[];
}

export interface IResAccountDetailShift {
  name: string;
  avatar: string;
  id: string;
  email: string;
}
