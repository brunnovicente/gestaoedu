import banco from './banco.js'
import Professor from "./Professor.js";
import Turma from "./Turma.js";

const Diario = banco.sequelize.define('diarios', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    status:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

Diario.belongsTo(Professor, {
    foreignKey: 'professor_id',
    constraint: true,
    onDelete: 'CASCADE'
})

Diario.belongsTo(Turma, {
    foreignKey: 'turma_id',
    constraint: true,
    onDelete: 'CASCADE'
})

export default Diario