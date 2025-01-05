import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material';
import { InputText } from '@renderer/components/InputText';
import { CardBody, MainCard } from '@renderer/components/MainCard';
import { t } from 'i18next';
import { useSignInPage } from './useSignInPage';

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
              />
              <InputText
                type={page.showPassword ? 'text' : 'password'}
                label={t('password')}
                placeholder={t('insert_password')}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox checked={page.showPassword} onChange={(_, checked) => page.setShowPassword(checked)} />
                }
                label={t('show_password')}
              />
              <Button variant="contained">{t('sign_in')}</Button>
            </div>
          </CardBody>
        </MainCard>
      </div>
    </div>
  );
}
