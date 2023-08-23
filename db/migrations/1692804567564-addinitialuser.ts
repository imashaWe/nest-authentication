import { generateHashPassword } from '../../src/utils/password-hash';
import { getDb } from '../migrations-utils/database-connection';

export const up = async () => {
  const db = await getDb();

  await db.collection('user').insertOne({
    username: 'admin',
    password: generateHashPassword('admin'),
  });
};

export const down = async () => {
  const db = await getDb();
  /*
      Code you downgrade script here!
   */
};
