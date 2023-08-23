import * as bcrypt from 'bcrypt';

export const generateHashPassword = (password: string): string => {
  const saltOrRounds = 10;
  const hash = bcrypt.hashSync(password, saltOrRounds);
  return hash;
};

export const compareHashPassword = (
  password: string,
  hash: string,
): boolean => {
  const isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
