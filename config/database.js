require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'products_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'postgresql',
    timezone: '+07:00',
    logging: console.log
  },
};