const dotenv = require('dotenv');
// dotenv.config();
dotenv.config({ path: `../${process.env.NODE_ENV}.env` });

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.PORT,
    },
    migrations: {
      directory: './migrations/',
      tableName: 'knex_migrations',
    },
  },

  testing: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.PORT,
      
     
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations/',
    },
  },

  onInsertTrigger: (table, field) => `
  CREATE TRIGGER before_insert_${table}
  BEFORE INSERT ON ${table}
  FOR EACH ROW
  SET new.${field} = uuid();
  `,
};