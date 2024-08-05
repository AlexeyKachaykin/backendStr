const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_ACCESS_KEY,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
    pool: {
      min: 0,
      max: 20,
    },
  },
  test: {
    client: "postgresql",
    connection: {
      port: process.env.TEST_DATABASE_PORT || process.env.DATABASE_PORT,
      host: process.env.TEST_DATABASE_HOST || process.env.DATABASE_HOST,
      database: process.env.TEST_DATABASE_NAME || process.env.DATABASE_NAME,
      user: process.env.TEST_DATABASE_USER || process.env.DATABASE_USER,
      password: process.env.TEST_DATABASE_ACCESS_KEY || process.env.DATABASE_ACCESS_KEY,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
    pool: {
      min: 0,
      max: 20,
    },
  },
};