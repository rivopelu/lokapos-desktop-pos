import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Button, CardActionArea, Divider, IconButton, Skeleton } from '@mui/material';
import { MainCard } from '@renderer/components/MainCard';
import { PageContainer } from '@renderer/components/PageContainer';
import { PopupModal } from '@renderer/components/PopupModal';
import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { useDataConstants } from '@renderer/constants/useDataConstants';
import { ORDER_PLATFORM_ENUM } from '@renderer/enums/order-patform-enum';
import { ORDER_PAYMENT_METHOD_ENUM } from '@renderer/enums/order-payment-method-enum';
import { ORDER_PAYMENT_STATUS_ENUM } from '@renderer/enums/order-payment-status-enum';
import { ORDER_TYPE_ENUM } from '@renderer/enums/order-type-enum';
import { NumberFormatterHelper } from '@renderer/helper/number-format-helper';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { useHomePage } from '@renderer/pages/home/useHomePage';
import { t } from 'i18next';
import { Fragment } from 'react';
import { MdAdd, MdCheckCircle, MdClose, MdRemove } from 'react-icons/md';
import { ROUTES } from '@renderer/routes/routes';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const page = useHomePage();
  const numberFormat = new NumberFormatterHelper();
  const data = useDataConstants();
  const navigate = useNavigate();

  function productCard(data?: IResListMenu, loading?: boolean) {
    return (
      <CardActionArea onClick={() => data && page.onAddItem(data)}>
        <MainCard>
          <div>
            <div className={'aspect-video'}>
              {loading ? (
                <Skeleton variant={'rectangular'} height={'100%'} />
              ) : (
                <img src={data?.image} draggable={false} alt={data?.name} className={'aspect-video  object-cover'} />
              )}
            </div>
            <div className={'p-3  h-full grid gap-1'}>
              {loading ? (
                <>
                  <Skeleton />
                  <Skeleton width={'75%'} />
                </>
              ) : (
                <>
                  <p className={'line-clamp-1 text-slate-600'}>{data?.name}</p>
                  <p className="font-semibold">{data?.price ? numberFormat.toRupiah(data.price) : '-'}</p>
                </>
              )}
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
            <div className=" grid gap-3 overflow-y-auto">
              {page.selectedMenuList.map((item, i) => (
                <MainCard key={i} className="p-2">
                  <div>
                    <div className="flex gap-3">
                      <div>
                        <img
                          alt={item.name}
                          draggable={'false'}
                          src={item.image}
                          className="object-cover w-32 aspect-video "
                        />
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
                    <div className="grid gap-4 grid-cols-2 mt-6">
                      <CardActionArea onClick={() => page.onMinItem(item)}>
                        <MainCard className="p-3 flex items-center justify-center">
                          <MdRemove />
                        </MainCard>
                      </CardActionArea>
                      <CardActionArea onClick={() => page.onAddItem(item)}>
                        <MainCard className="p-3 flex items-center justify-center">
                          <MdAdd />
                        </MainCard>
                      </CardActionArea>
                    </div>
                  </div>
                </MainCard>
              ))}
              <div className="h-20"></div>
            </div>
            <div className=" -translate-y-16 grid gap-6 bg-white">
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
              <div className="grid gap-4">
                <LoadingButton
                  disabled={page.checkDisableButtonOrder()}
                  loading={page.loadingSubmit}
                  variant="contained"
                  fullWidth
                  onClick={() => page.setShowModalOrder(true)}
                >
                  {t('order')}
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function componentModalQris() {
    return (
      <div className="w-full grid  gap-7">
        <div className="w-full items-center justify-center ">
          {page?.responseCreateOrder?.payment_status === ORDER_PAYMENT_STATUS_ENUM.SUCCESS ? (
            <div className="p-1 h-48 w-48 bg-green-200 flex items-center justify-center  rounded-full">
              <MdCheckCircle className="text-green-600 text-8xl" />
            </div>
          ) : (
            <>
              {page?.responseCreateOrder?.qris_url || ''}
              {page?.responseCreateOrder?.qris_url && (
                <img className="w-48" src={page?.responseCreateOrder?.qris_url} alt="qris" />
              )}
            </>
          )}
        </div>
        <LoadingButton onClick={page.onCheckStatusOrder} loading={page.loadingCheckStatusOrder} fullWidth>
          {t('check_status')}
        </LoadingButton>
      </div>
    );
  }

  function componentModalShift() {
    return (
      <div className="w-96 grid gap-7">
        <div className={'flex items-center justify-center flex-col gap-2 text-center'}>
          <p className={'font-semibold text-2xl'}>{t('modal_shift_title')}</p>
          <p className={'text-slate-500 '}>{t('modal_shift_description')}</p>
        </div>
        <Button onClick={() => navigate(ROUTES.START_SHIFT())} variant={'contained'}>
          {t('start_shift')}
        </Button>
      </div>
    );
  }

  function componentModalOrder() {
    return (
      <div className="grid gap-4">
        <div className="grid gap-2 text-center">
          <div className="w-full text-center capitalize font-semibold">{t('payment_method')}</div>
          <div className="grid gap-4 grid-cols-2">
            {data.paymentMethodData.map((item) => (
              <CardActionArea
                key={item.value}
                onClick={() => page.setSelectedPaymentMethod(item.value as ORDER_PAYMENT_METHOD_ENUM)}
              >
                <MainCard>
                  <div
                    className={`p-4 flex items-center gap-2 duration-300 justify-center border ${page.selectedPaymentMethod === item.value ? ' bg-primary-main/10 border-primary-main text-primary-main ' : ''}`}
                  >
                    <div className="uppercase font-semibold">{item.label}</div>
                  </div>
                </MainCard>
              </CardActionArea>
            ))}
          </div>
        </div>
        <Divider />

        <div className="grid gap-2 text-center">
          <div className="w-full text-center capitalize font-semibold">{t('order_type')}</div>
          <div className="grid gap-4 grid-cols-2">
            {data.orderTypeList.map((item) => (
              <CardActionArea key={item.value} onClick={() => page.setSelectedOrderType(item.value as ORDER_TYPE_ENUM)}>
                <MainCard>
                  <div
                    className={`p-4 flex items-center gap-2 duration-300 justify-center border ${page.selectedOrderType === item.value ? ' bg-primary-main/10 border-primary-main text-primary-main ' : ''}`}
                  >
                    <div className="uppercase font-semibold">{item.label}</div>
                  </div>
                </MainCard>
              </CardActionArea>
            ))}
          </div>
        </div>
        <Divider />
        <div className="grid gap-2 text-center">
          <div className="w-full text-center capitalize font-semibold">{t('platform')}</div>
          <div className="grid gap-4 grid-cols-4">
            {data.orderPlatformList.map((item) => (
              <CardActionArea
                key={item.value}
                onClick={() => page.setSelectedPlatform(item.value as ORDER_PLATFORM_ENUM)}
              >
                <MainCard>
                  <div
                    className={`p-4 flex items-center gap-2 duration-300 justify-center border ${page.selectedPlatform === item.value ? ' bg-primary-main/10 border-primary-main text-primary-main ' : ''}`}
                  >
                    <div className="uppercase font-semibold">{item.label}</div>
                  </div>
                </MainCard>
              </CardActionArea>
            ))}
          </div>
          <div className="mt-7"></div>
          <LoadingButton
            loading={page.loadingSubmit}
            onClick={() => page.onSubmitCreateOrder()}
            disabled={page.checkButtonModalDisable()}
            variant="contained"
          >
            {t('submit')}
          </LoadingButton>
        </div>
      </div>
    );
  }

  return (
    <main className="flex">
      <PopupModal
        open={!!page.responseCreateOrder}
        component={componentModalQris()}
        onClose={() => page.setResponseCreateOrder(undefined)}
      />
      <PopupModal open={page.showModalOrder} component={componentModalOrder()} onClose={page.onCloseModalOrder} />
      <PopupModal open={page.showModalShift} component={componentModalShift()} onClose={page.onCloseModalShift} />
      <div className={' flex-1 mt-8'}>
        <PageContainer>
          <div className={'grid gap-6'}>
            {page.profile?.merchant_address && page.showAlertMerchant && (
              <Alert
                action={
                  <IconButton onClick={() => page.setShowAlertMerchant(false)}>
                    <MdClose />
                  </IconButton>
                }
                variant={'outlined'}
                severity="info"
              >
                <AlertTitle>{t('you_in_merchant', { name: page.profile.merchant_name })}</AlertTitle>
                <p>{page.profile.merchant_address}</p>
              </Alert>
            )}
            <div className={'grid grid-cols-4 gap-4'}>
              {page.loadingListCategory ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} height={80} />
                  ))}
                </>
              ) : (
                <>
                  {page.listCategory.map((item, i) => (
                    <CardActionArea key={i} onClick={() => page.onSelectCategory(item)} sx={{ background: 'white' }}>
                      <div
                        className={`bg-white flex items-center justify-center duration-500 p-4 border ${page.selectedCategory === item.id ? 'bg-primary-main/10 border-primary-main text-primary-main ' : ''}`}
                      >
                        <div className={'uppercase font-semibold'}>{item.name}</div>
                      </div>
                    </CardActionArea>
                  ))}
                </>
              )}
            </div>
            <div className={'grid gap-4 grid-cols-4'}>
              {page.loadingDataMenu ? (
                <>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Fragment key={i}>{productCard(undefined, true)}</Fragment>
                  ))}
                </>
              ) : (
                <>
                  {page.dataMenu.map((item, i) => (
                    <Fragment key={i}>{productCard(item)}</Fragment>
                  ))}
                </>
              )}
            </div>
          </div>
        </PageContainer>
      </div>
      {rightContent()}
    </main>
  );
}
