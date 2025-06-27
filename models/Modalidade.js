import banco from './banco.js'

const Modalidade = banco.sequelize.define('modalidades', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(100),
    },
    tipo:{
        type: banco.Sequelize.INTEGER,
    }
})

export default Modalidade