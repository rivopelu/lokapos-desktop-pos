import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { BrandLogo } from './BrandLogo';
import { PageContainer } from './PageContainer';
import { t } from 'i18next';
import { ROUTES } from '@renderer/routes/routes';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';
import { Avatar, IconButton } from '@mui/material';

export function TopBar() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const profile = Account?.getMe;

  const [currentPage, setCurrentPage] = useState<string>('');
  const location = useLocation();
  const dataListNavbar = [
    {
      label: t('home'),
      route: ROUTES.HOME(),
    },
    {
      label: t('order'),
      route: ROUTES.ORDER(),
    },
    {
      label: t('history'),
      route: ROUTES.HISTORY(),
    },
  ];

  useEffect(() => {
    setCurrentPage(location.pathname || '/');
  }, [location.pathname]);

  return (
    <div>
      <div
        style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}
        className="border-b fixed w-full bg-white shadow-md h-full"
      >
        <PageContainer className="h-full bg ">
          <div className="grid grid-cols-3 h-full">
            <div className="flex items-center ">
              <BrandLogo />
            </div>
            <div className="h-full flex items-center justify-center gap-5">
              {dataListNavbar.map((item, index) => (
                <Link
                  className={`uppercase ${currentPage === item.route ? 'text-primary-dark' : ''}`}
                  to={item.route}
                  key={index}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-end">
              <IconButton>
                <Avatar sx={{ width: 32, height: 32 }} src={profile?.data?.avatar} />
              </IconButton>
            </div>
          </div>
        </PageContainer>
      </div>
      <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
    </div>
  );
}
