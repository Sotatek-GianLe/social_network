import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`),
  },
];