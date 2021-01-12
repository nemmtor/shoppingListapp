export enum EConstrainKeys {
  username = 'username',
  password = 'password',
  listTitle = 'listTitle',
}

type Keys = keyof typeof EConstrainKeys;

interface IMinMax {
  min: number;
  max: number;
}

type Fields = { [key in Keys]?: IMinMax };

interface ISharedConstrains extends Fields {
  username: IMinMax;
  password: IMinMax;
  listTitle: IMinMax;
}

export const sharedConstrains: ISharedConstrains = {
  username: {
    min: 6,
    max: 20,
  },
  password: {
    min: 4,
    max: 15,
  },
  listTitle: {
    min: 5,
    max: 30,
  },
};
