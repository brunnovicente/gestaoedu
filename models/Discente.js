import banco from './banco.js'

const Discente = banco.sequelize.define('discentes', {

    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: banco.Sequelize.STRING(100),
    },
    email:{
        type: banco.Sequelize.STRING(100),
        unique: true,
    },
    matricula:{
        type: banco.Sequelize.STRING(20),
        unique: true
    },
    status:{
        type: banco.Sequelize.INTEGER,
    },
    codigo:{
        type: banco.Sequelize.STRING(50),
    }

})

export default Discente;