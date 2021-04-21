const { Sequelize } = require('sequelize');

const db = 'task3';
const username = 'nodejs';
const password = '12345';

export const sequelize = new Sequelize(db, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    protocol: null,
    pool: { maxConnections: 5, maxIdleTime: 30}
});

async function checkConnection() { 
    try { 
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConnection();