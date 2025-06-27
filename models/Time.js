import banco from './banco.js'
import Aluno from './Aluno.js'
import Modalidade from './Modalidade.js'

const Time = banco.sequelize.define('times', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
    },

})

Time.belongsTo(Aluno, {
    foreignKey: 'aluno_id',
    constraint: true,
    onDelete: 'CASCADE',
})

Time.belongsTo(Modalidade, {
    foreignKey: 'modalidade_id',
    constraint: true,
    onDelete: 'CASCADE',
})

export default Time