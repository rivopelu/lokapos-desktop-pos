import { IResBusinessDetail } from './IResBusinessDetail';

export interface IResGetMe {
  first_name: string;
  last_name: string;
  is_verified_email: boolean;
  avatar?: string;
  full_name: string;
  email: string;
  id: string;
  role?: string;
  business?: IResBusinessDetail;
  merchant_id?: string;
  merchant_name?: string;
  merchant_address?: string;
  shift_id?: string;
  start_shift_date?: number;
  is_active_shift: boolean;
}
