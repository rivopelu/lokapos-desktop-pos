import { useHomePage } from '@renderer/pages/useHomePage';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { Fragment } from 'react';
import { MainCard } from '@renderer/components/MainCard';
import { PageContainer } from '@renderer/components/PageContainer';
import { Button, CardActionArea, Divider } from '@mui/material';
import { NumberFormatterHelper } from '@renderer/helper/number-format-helper';
import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { LoadingButton } from '@mui/lab';
import { t } from 'i18next';
import { PopupModal } from '@renderer/components/PopupModal';

export function HomePage() {
  const page = useHomePage();
  const numberFormat = new NumberFormatterHelper();

  function productCard(data: IResListMenu) {
    return (
      <CardActionArea onClick={() => page.onSelectMenu(data)}>
        <MainCard>
          <div>
            <div className={'aspect-video'}>
              <img src={data.image} draggable={false} alt={data.name} className={'aspect-video  object-cover'} />
            </div>
            <div className={'p-3  h-full grid gap-1'}>
              <p className={'line-clamp-1 text-slate-600'}>{data.name}</p>
              <p className="font-semibold">{data.price ? numberFormat.toRupiah(data.price) : '-'}</p>
            </div>
          </div>
        </MainCard>
      </CardActionArea>
    );
  }

  function rightContent() {
    return (
      <div className={'bg-white  w-[400px] '}>
        <div
          className="fixed border-l bg-white top-0 h-screen "
          style={{ width: STYLE_VARIABLE.SIZE.SIDE_CASHIER_WIDTH }}
        >
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
          <div className="p-3 flex-1  h-full flex flex-col justify-between">
            <div className=" grid gap-3">
              {page.selectedMenuList.map((item, i) => (
                <MainCard key={i} className="p-2">
                  <div className="flex gap-3">
                    <div>
                      <img draggable={'false'} src={item.image} className="object-cover w-32 aspect-video " />
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <div className="text-slate-600">{item.name}</div>
                        <div className="font-semibold">
                          {item.qty ? numberFormat.toRupiah(item.price * item.qty) : ''}
                        </div>
                      </div>
                      <div className="font-semibold">x{item.qty}</div>
                    </div>
                  </div>
                </MainCard>
              ))}
            </div>
            <div className=" -translate-y-16 grid gap-6">
              <div>
                <div className="flex justify-between">
                  <div className="text-slate-500">{t('total_transaction')}</div>
                  <div>{page.selectedMenuList.length > 0 ? numberFormat.toRupiah(page.dataTotal.price) : '-'}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-slate-500">{t('total_item')}</div>
                  <div>{page.selectedMenuList.length > 0 ? page.dataTotal.item : '-'}</div>
                </div>
              </div>
              <Divider />
              <LoadingButton
                disabled={page.selectedMenuList.length === 0}
                loading={page.loadingSubmit}
                variant="contained"
                fullWidth
                onClick={page.onSubmitCreateOrder}
              >
                {t('order')}
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function componentModalQris() {
    return (
      <div>
        {page.qrisUrl && <img className="w-48" src={page.qrisUrl} alt="qris" />}
        <Button fullWidth>{t('check_status')}</Button>
      </div>
    );
  }

  return (
    <main className="flex">
      <PopupModal open={!!page.qrisUrl} component={componentModalQris()} onClose={() => page.setQrisUrl(undefined)} />
      <div className={' flex-1 mt-8'}>
        <PageContainer>
          <div className={'grid gap-6'}>
            <div className={'grid grid-cols-4 gap-4'}>
              {page.listCategory.map((item, i) => (
                <CardActionArea key={i} onClick={() => page.onSelectCategory(item)} sx={{ background: 'white' }}>
                  <div
                    className={`bg-white flex items-center justify-center duration-500 p-4 border ${page.selectedCategory === item.id ? 'bg-primary-main/10 border-primary-main text-primary-main ' : ''}`}
                  >
                    <div className={'uppercase font-semibold'}>{item.name}</div>
                  </div>
                </CardActionArea>
              ))}
            </div>
            <div className={'grid gap-4 grid-cols-4'}>
              {page.dataMenu.map((item, i) => (
                <Fragment key={i}>{productCard(item)}</Fragment>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>
      {rightContent()}
    </main>
  );
}
