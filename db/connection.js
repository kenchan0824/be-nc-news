const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

let config = {};
if (process.env.NODE_ENV === 'production') {
  config = {
    connectionString: process.env.DATABASE_URL,
    max: 2,
  };
}

console.log(`connecting to ${ENV} database...`);

module.exports = new Pool(config);
