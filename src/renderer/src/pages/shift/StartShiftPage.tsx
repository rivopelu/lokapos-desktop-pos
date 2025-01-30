import { CardBody, MainCard } from '@renderer/components/MainCard';
import { t } from 'i18next';
import { LoadingButton } from '@mui/lab';
import { useStartShiftPage } from '@renderer/pages/shift/useStartShiftPage';
import { Avatar, CardActionArea, InputAdornment, Skeleton, TextField } from '@mui/material';
import { IResListAccount } from '@renderer/models/response/IResListAccount';
import { Fragment } from 'react';
import { MdClose, MdSearch } from 'react-icons/md';

export function StartShiftPage() {
  const page = useStartShiftPage();

  function cardActionList(item?: IResListAccount, loading?: boolean) {
    return (
      <CardActionArea sx={{ borderRadius: 2 }} onClick={() => page.onChangeSelect(item?.id)}>
        <div
          className={`${page.selectedAccountId.find((e) => e === item?.id) ? 'bg-primary-main/10 border-primary-main text-primary-main' : 'bg-white text-slate-500'}  rounded-lg border p-4`}
        >
          <div className={'flex items-center gap-3 w-full'}>
            {loading ? (
              <Skeleton variant={'circular'} height={40} width={40} />
            ) : (
              <Avatar sx={{ height: 40, width: 40 }} src={item?.avatar} />
            )}
            {loading ? (
              <div className={'flex-1'}>
                <Skeleton width={'70%'} />
                <Skeleton width={140} />
              </div>
            ) : (
              <div>
                <p>{item?.full_name}</p>
                <p className={'text-xs'}>{item?.email}</p>
              </div>
            )}
            {item?.is_active_shift && <div className={'h-3 w-3 bg-green-500 rounded-full'}></div>}
          </div>
        </div>
      </CardActionArea>
    );
  }

  return (
    <div className={'min-h-[90vh] w-screen flex items-center justify-center'}>
      <MainCard>
        <CardBody className={'grid gap-8'}>
          <p className={'text-2xl  text-slate-600'}>{t('select_shift_team_title')}</p>
          <TextField
            size="small"
            value={page.searchValue}
            variant="outlined"
            placeholder={t('search_account_name')}
            onChange={(e) => page.onSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {page.searchValue ? (
                      <InputAdornment position="end" style={{}} onClick={() => page.onSearchChange()}>
                        <MdClose />
                      </InputAdornment>
                    ) : (
                      <></>
                    )}
                  </>
                ),
              },
            }}
          />
          <div className={'grid grid-cols-4 gap-3 w-full '}>
            {page.loadingGetListAccount
              ? Array.from(Array(8).keys()).map((_, i) => (
                  <Fragment key={i}>{cardActionList(undefined, true)}</Fragment>
                ))
              : page.filterList().map((item, i) => <Fragment key={i}>{cardActionList(item)}</Fragment>)}
          </div>

          {page.searchValue && page.filterList().length == 0 && (
            <div className={'min-w-[700px] mb-10 capitalize text-slate-500 flex items-center justify-center'}>
              <div>{t('no_search_result')}</div>
            </div>
          )}

          <LoadingButton
            disabled={page.selectedAccountId.length == 0}
            loading={page.loadingSubmit}
            onClick={page.onSubmit}
            variant={'contained'}
          >
            {t('submit')}
          </LoadingButton>
        </CardBody>
      </MainCard>
    </div>
  );
}
