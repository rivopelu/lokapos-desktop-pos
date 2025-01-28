export const ENDPOINT = {
  SIGN_IN: () => `/auth/v1/sign-in`,
  GET_ME: () => `/account/v1/get-me`,
  GET_CATEGORIES: () => `/master-data/v1/category/list`,
  GET_LIST_MENU: () => `/master-data/v1/menu/list`,
  CREATE_ORDER: () => `/order/v1/create`,
  CHECK_STATUS_ORDER: (id: string) => `/order/v1/check-status/${id}`,
  LIST_ORDER: (param?: string) => `/order/v1/list${param || ''}`,
  DETAIL_ORDER: (id: string) => `/order/v1/detail/${id}`,
  READY_ORDER: (id: string) => `/order/v1/ready/${id}`,
  LIST_MERCHANT: () => '/merchant/v1/list',
  SELECT_MERCHANT: (id: string) => `/merchant/v1/select-merchant?merchant_id=${id}`,
  LIST_ACCOUNT_SHIFT: () => `/account/v1/admin/account-list`,
};
