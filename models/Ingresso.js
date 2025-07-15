import banco from './banco.js'
import Aluno from '../models/Aluno.js'

const Ingresso = banco.sequelize.define('ingressos', {

    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
    },
    codigo:{
        type: banco.Sequelize.STRING(100),
        unique: true,
    },
    qrcode:{
        type: banco.Sequelize.STRING(500),
        unique: true
    },
    status:{
        type: banco.Sequelize.INTEGER,
    },

})

Ingresso.belongsTo(Aluno, {
    foreignKey: 'aluno_id',
    constraint: true,
    onDelete: 'CASCADE',
})

export default Ingresso