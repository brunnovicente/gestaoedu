import banco from './banco.js'
import Professor from "./Professor.js";

const Curso = banco.sequelize.define('cursos', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    sigla:{
        type: banco.Sequelize.STRING(20),
    }
    ,
    status:{
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

Curso.belongsTo(Professor, {
    foreignKey: 'professor_id',
    constraint: true,
    onDelete: 'CASCADE',
    as: 'professor'
})
export default Curso