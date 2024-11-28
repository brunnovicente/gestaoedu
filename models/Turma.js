import banco from './banco.js'
import Curso from "./Curso.js";

const Turma = banco.sequelize.define('turmas', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: banco.Sequelize.STRING(50),
        allowNull: false
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    semestre:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    },
    ano:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    },
    status:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

Turma.belongsTo(Curso, {
    foreignKey: 'curso_id',
    constraint: true,
    onDelete: 'CASCADE'
})

export default Turma