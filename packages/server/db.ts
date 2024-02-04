import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from './models/Topic';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    };
    const sequelize = new Sequelize(sequelizeOptions);

    sequelize.addModels([Topic]);

    await sequelize.authenticate();
    await sequelize.sync();

    console.log('  ➜ 🎸 Connected to the database success');

    return sequelize;
  } catch (e) {
    console.error(e);
  }

  return null;
};
