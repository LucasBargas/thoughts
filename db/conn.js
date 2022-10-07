require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  },
);

try {
  sequelize.authenticate(); // Checando conexão com o banco
  console.log('Conectado ao banco! Acesse: http://localhost:3000');
} catch (error) {
  console.log('Não foi possível conectar: ', error);
}

module.exports = sequelize;
