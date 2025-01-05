import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material';
import { InputText } from '@renderer/components/InputText';
import { CardBody, MainCard } from '@renderer/components/MainCard';
import { t } from 'i18next';
import { useSignInPage } from './useSignInPage';
import { LoadingButton } from '@mui/lab';

export function SignInPage() {
  const page = useSignInPage();
  const formik = page.formik;

  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <div className="w-full bg-slate-200 min-h-screen"></div>
      <div className="h-full flex items-center justify-center">
        <MainCard>
          <CardBody>
            <div className="font-semibold text-2xl">{t('sign_in')}</div>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="grid gap-8 min-w-80">
              <InputText
                label={t('email')}
                placeholder={t('insert_email')}
                required
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.email && formik.errors.email}
                value={formik.values.email}
              />
              <InputText
                type={page.showPassword ? 'text' : 'password'}
                label={t('password')}
                placeholder={t('insert_password')}
                required
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.password && formik.errors.password}
                value={formik.values.password}
              />
              <FormControlLabel
                control={
                  <Checkbox checked={page.showPassword} onChange={(_, checked) => page.setShowPassword(checked)} />
                }
                label={t('show_password')}
              />
              <LoadingButton loading={page.loadingSubmit} onClick={() => formik.handleSubmit()} variant="contained">
                {t('sign_in')}
              </LoadingButton>
            </div>
          </CardBody>
        </MainCard>
      </div>
    </div>
  );
}
