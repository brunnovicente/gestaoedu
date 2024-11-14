import banco from './banco.js'
import Diario from "./Diario.js";
import Permuta from "./Permuta.js";

const Retorno = banco.sequelize.define('retornos', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: banco.Sequelize.DATE,
        allowNull: false
    },
    horarios:{
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },

    status:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

//Professor.sync()

Retorno.belongsTo(Diario, {
    foreignKey: 'diario_id',
    constraint: true,
    onDelete: 'CASCADE'
})

Retorno.belongsTo(Permuta, {
    foreignKey: 'permuta_id',
    constraint: true,
    onDelete: 'CASCADE'
})
export default Retorno