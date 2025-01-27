import { ENDPOINT } from '@renderer/constants/endpoint';
import { IReqSignIn } from '@renderer/models/request/IReqSignIn';
import { BaseResponse } from '@renderer/models/response/IResModel';
import AuthServices from '@renderer/service/auth.service';
import ErrorService from '@renderer/service/error.service';
import { HttpService } from '@renderer/service/http.service';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import * as yup from 'yup';
export function useSignInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const httpService = new HttpService();
  const errorService = new ErrorService();
  const authService = new AuthServices();

  const initState: IReqSignIn = {
    email: 'contactrivopelu@gmail.com',
    password: 'WZNE2KMs',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(t('validation.required', { name: t('email') }))
      .email(t('invalid_email')),
    password: yup.string().required(t('validation.required', { name: t('password') })),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.SIGN_IN(), e)
        .then((res: BaseResponse<any>) => {
          setLoadingSubmit(false);
          authService.successLogin(res.data?.response_data?.access_token);
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    },
  });

  return { showPassword, setShowPassword, formik, loadingSubmit };
}
