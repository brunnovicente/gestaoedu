import banco from "./banco.js";
import Calendario from "./Calendario.js";

const Dia = banco.sequelize.define("dias", {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia:{
        type: banco.Sequelize.INTEGER,
    },
    data:{
        type: banco.Sequelize.DATEONLY,
    },
    sabado:{
        type: banco.Sequelize.INTEGER,
    }
})

Dia.belongsTo(Calendario, {
    foreignKey: 'calendario_id',
    constraint: true,
})

export default Dia;