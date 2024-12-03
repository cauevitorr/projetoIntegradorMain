import conn from "../config/conn.js";
import { DataTypes } from "sequelize";


const Funcionario = conn.define("funcionarios", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    funcao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treinamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_treinamento: {
        type: DataTypes.ENUM,
        values: ["pendente", "cursando", "concluida"]
    },
    data_inicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_conclusao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}) 


export default Funcionario;