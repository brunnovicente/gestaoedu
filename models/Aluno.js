import banco from './banco.js'

const Aluno = banco.sequelize.define('alunos', {

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
    },
    matricula:{
        type: banco.Sequelize.STRING(20),
    },
    codigo:{
        type: banco.Sequelize.STRING(20),
    },
    curso:{
        type: banco.Sequelize.STRING(20),
    }

})

export default Aluno;