export const ENDPOINT = {
  SIGN_IN: () => `/auth/v1/sign-in`,
  GET_ME: () => `/account/v1/get-me`,
  GET_CATEGORIES: () => `/master-data/v1/category/list`,
  GET_LIST_MENU: () => `/master-data/v1/menu/list`,
  CREATE_ORDER: () => `/order/v1/create`,
  CHECK_STATUS_ORDER: (id: string) => `/order/v1/check-status/${id}`,
  LIST_ORDER: (param?: string) => `/order/v1/list${param || ''}`,
};
