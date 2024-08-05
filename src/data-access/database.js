const knex = require('knex');
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexfile[environment];

if (!connectionConfig) {
    throw new Error(`No configuration found for environment: ${ environment }`);
}

const db = knex(connectionConfig);

async function connectDB() {
    try {
        console.log('Attempting to connect to database with config:', JSON.stringify(connectionConfig, null, 2));
        await db.raw('SELECT 1');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

const snakeToCamel = (str) => str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

const mapKeys = (obj) => {
    const mapped = {};
    for (const key in obj) {
        mapped[snakeToCamel(key)] = obj[key];
    }
    return mapped;
};

module.exports = { db, connectDB, mapKeys };