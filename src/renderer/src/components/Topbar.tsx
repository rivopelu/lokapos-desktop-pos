import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { BrandLogo } from './BrandLogo';

export function Topbar() {
  return (
    <div>
      <div
        style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}
        className="border-b fixed w-full bg-white shadow-md flex items-center justify-center"
      >
        <BrandLogo />
      </div>
      <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
    </div>
  );
}
