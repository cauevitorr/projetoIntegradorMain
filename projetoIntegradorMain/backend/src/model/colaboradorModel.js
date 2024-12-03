import conn from "../config/conn.js";
import { DataTypes } from "sequelize";


const colaborador = conn.define("colaboradores", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}) 


export default colaborador;