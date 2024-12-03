import Sequelize from "sequelize"
//mudar para o seu banco de dados:
const conn = new Sequelize('projetoIntegrador', 'root', 'Sen@iDev77!.', {
    host: 'localhost',
    dialect: 'mysql' 
  });


export default conn;