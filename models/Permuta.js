import banco from './banco.js'
import Diario from "./Diario.js";

const Permuta = banco.sequelize.define('permutas', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: banco.Sequelize.DATE,
        allowNull: false
    },
    dia:{
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },
    horarios:{
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },
    justificativa:{
        type: banco.Sequelize.STRING(250),
        allowNull: false
    },
    status:{ //0 - Pendente, 1 - Aberta, 2 Fechada
        type: banco.Sequelize.INTEGER,
        allowNull: false
    }
})

Permuta.belongsTo(Diario, {
    foreignKey: 'diario_id',
    constraint: true,
    as: 'diario',
    onDelete: 'CASCADE',

})

Permuta.belongsTo(Diario, {
    foreignKey: 'substituto_id',
    constraint: true,
    as: 'substituto',
    onDelete: 'CASCADE',
})

export default Permuta