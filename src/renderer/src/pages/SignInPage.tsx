import { InputText } from '@renderer/components/InputText';
import { CardBody, MainCard } from '@renderer/components/MainCard';

export function SignInPage() {
  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <div className="w-full bg-slate-200 min-h-screen"></div>
      <div className="h-full flex items-center justify-center">
        <MainCard>
          <CardBody>
            <div>
              <InputText label="email" placeholder="insert email" />
            </div>
          </CardBody>
        </MainCard>
      </div>
    </div>
  );
}
