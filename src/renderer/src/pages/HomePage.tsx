import { useHomePage } from '@renderer/pages/useHomePage';
import { IResListMenu } from '@renderer/models/response/IResListMenu';
import { Fragment } from 'react';
import { MainCard } from '@renderer/components/MainCard';
import { PageContainer } from '@renderer/components/PageContainer';
import { CardActionArea } from '@mui/material';

export function HomePage() {
  const page = useHomePage();

  function productCard(data: IResListMenu) {
    return (
      <MainCard>
        <div>
          <div className={'aspect-video'}>
            <img src={data.image} alt={data.name} className={'aspect-video  object-cover'} />
          </div>
          <div className={'p-2 flex items-end h-full'}>
            <p className={'line-clamp-1'}>{data.name}</p>
          </div>
        </div>
      </MainCard>
    );
  }

  return (
    <main className="flex">
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
      <div className={'bg-white border-l w-[400px]'}>
        <div>HELLO</div>
      </div>
    </main>
  );
}
