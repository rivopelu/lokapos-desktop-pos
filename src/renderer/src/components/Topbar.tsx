import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { BrandLogo } from './BrandLogo';
import { PageContainer } from './PageContainer';

export function Topbar() {
  return (
    <div>
      <div
        style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}
        className="border-b fixed w-full bg-white shadow-md h-full"
      >
        <PageContainer className='h-full bg '>
          <div className='grid grid-cols-3 h-full'>
            <div className='flex items-center '>
              <BrandLogo />
            </div>
            <div className='h-full flex items-center justify-center'>
              <div>HELLO</div>
            </div>
            <div className='flex items-center justify-end'>
              <div>HELLO</div>
            </div>
          </div>
        </PageContainer>
      </div>
      <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
    </div>
  );
}
