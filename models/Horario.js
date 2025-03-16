import banco from './banco.js'
import Diario from './Diario.js'
import Dia from "./Dia.js";

const Horario = banco.sequelize.define('horarios', {

    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    turno: {
        type: banco.Sequelize.INTEGER,
    },
    sequencia:{
        type: banco.Sequelize.INTEGER,
    },

    status:{
        type: banco.Sequelize.INTEGER,
    }

})

Horario.belongsTo(Diario, {
    foreignKey: 'diario_id',
    constraint: true,
})

Horario.belongsTo(Dia, {
    foreignKey: 'dia_id',
    constraint: true,
})

export default Horario