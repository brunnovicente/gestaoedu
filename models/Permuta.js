import banco from './banco.js'
import Diario from "./Diario.js";

const Permuta = banco.sequelize.define('permutas', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: banco.Sequelize.DATE,
        allowNull: false
    },
    retorno: {
        type: banco.Sequelize.DATE,
        allowNull: false
    },
    horarios:{
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },
    horarios2:{
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },
    justificativa:{
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    status:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

//Professor.sync()

Permuta.belongsTo(Diario, {
    foreignKey: 'diario_id',
    constraint: true,
    onDelete: 'CASCADE'
})

Permuta.belongsTo(Diario, {
    foreignKey: 'substituto_id',
    constraint: true,
    onDelete: 'CASCADE'
})

export default Permuta