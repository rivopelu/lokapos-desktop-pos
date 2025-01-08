import { faker } from '@faker-js/faker/locale/id_ID';

export interface IResListMenu {
  name: string;
  price: number;
  image: string;
  id: string;
}

export const dummyListMenu: IResListMenu[] = Array.from({ length: 20 }).map((_, i) => {
  return {
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 10000, max: 100000 }),
    id: i.toString(),
  };
});
