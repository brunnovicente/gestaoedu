import banco from './banco.js'
import Professor from './Professor.js'

const Usuario = banco.sequelize.define('usuarios', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    categoria:{
        type: banco.Sequelize.INTEGER,
        default: 0
    },
    status: {
        type: banco.Sequelize.INTEGER,
        default: 0
    },
})

Usuario.belongsTo(Professor, {
    foreignKey: 'professor_id',
    constraint: true,
    onDelete: 'CASCADE'
})

export default Usuario