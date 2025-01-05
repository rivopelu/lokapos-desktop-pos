import { IReqSignIn } from '@renderer/models/request/IReqSignIn';
import { useFormik } from 'formik';
import { useState } from 'react';

export function useSignInPage() {
  const initState: IReqSignIn = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (e) => {
      alert(JSON.stringify(e));
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return { showPassword, setShowPassword, formik };
}
