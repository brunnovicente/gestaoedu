import banco from "./banco.js";
import Calendario from "./Calendario.js";

const Dia = banco.sequelize.define("dias", {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data:{
        type: banco.Sequelize.DATEONLY,
    },
    tipo:{
        type: banco.Sequelize.INTEGER,
    },
    obs:{
        type: banco.Sequelize.STRING('250'),
    },
    dia:{
        type: banco.Sequelize.STRING('20'),
    }
})

Dia.belongsTo(Calendario, {
    foreignKey: 'calendario_id',
    constraint: true,
})

export default Dia;