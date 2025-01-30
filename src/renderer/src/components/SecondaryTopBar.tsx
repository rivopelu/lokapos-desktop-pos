import { IAccountSlice } from '@renderer/redux/reducers/account.reducer';
import { useAppSelector } from '@renderer/redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@renderer/routes/routes';
import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { PageContainer } from '@renderer/components/PageContainer';
import { BrandLogo } from '@renderer/components/BrandLogo';
import { Avatar, IconButton } from '@mui/material';
import { MdArrowBack } from 'react-icons/md';

export function SecondaryTopBar() {
  const Account: IAccountSlice = useAppSelector((state) => state.Account);
  const profile = Account?.getMe;
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}
        className="border-b fixed w-full bg-white shadow-md h-full z-30"
      >
        <PageContainer className="h-full bg ">
          <div className="grid grid-cols-3 h-full">
            <div className="flex items-center ">
              <IconButton onClick={() => navigate(-1)}>
                <MdArrowBack />
              </IconButton>
            </div>
            <div className="h-full flex items-center justify-center gap-5">
              <BrandLogo />
            </div>
            <div className="flex items-center justify-end">
              <Link to={ROUTES.PROFILE()}>
                <IconButton>
                  <Avatar sx={{ width: 32, height: 32 }} src={profile?.data?.avatar} />
                </IconButton>
              </Link>
            </div>
          </div>
        </PageContainer>
      </div>
      <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
    </div>
  );
}
