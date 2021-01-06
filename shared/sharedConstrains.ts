interface ISharedConstrains {
  [key: string]: any;
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
};
