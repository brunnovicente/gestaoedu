import banco from './banco.js'
import Aluno from "./Aluno.js";
import Time from "./Time.js";

const Membro = banco.sequelize.define('membros', {

    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

})

Membro.belongsTo(Aluno, {
    foreignKey: 'aluno_id',
    constraint: true,
    onDelete: 'CASCADE',
})

Membro.belongsTo(Time, {
    foreignKey: 'time_id',
    constraint: true,
    onDelete: 'CASCADE',
})

export default Membro