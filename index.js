import express from "express";
const servidor = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import session from "express-session";
import flash from "connect-flash"
import passport from "passport"
import auth from "./config/auth.js";
auth(passport)


///////////////////////////////
//CONFIGURAÇÕES
///////////////////////////////
const PORTA = 3000
//Sessão
servidor.use(session({
    secret: "iambatman",
    resave: true,
    saveUninitialized: true,
}))
servidor.use(passport.initialize())
servidor.use(passport.session())
servidor.use(flash());

servidor.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.usuario = req.user || null
    next()
});

//Template Engine
servidor.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    'helpers':{
        json: function(context) {
            return JSON.stringify(context, null, 2);
        },
        formatDate: function (date) {
            const d =  new Date(date)
            const day = String(d.getDate()).padStart(2, '0')
            const month = String(d.getMonth() + 1).padStart(2, '0') // Mês começa do 0
            const year = d.getFullYear()
            // const hours = String(d.getHours()).padStart(2, '0')
            // const minutes = String(d.getMinutes()).padStart(2, '0')
            // const seconds = String(d.getSeconds()).padStart(2, '0')
            //return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
            return `${day}/${month}/${year}`
        },
        categoriaUsuario: function (categoria){
            switch (categoria) {
                case 0: return "Discente";
                case 1: return "Docente";
                case 2: return "Coordenador";
                case 3: return "Departamento Ensino";
                case 4: return "Supremo";
            }
        },
        defineHorario: function (horario){
            var horarios = horario.split(' / ')
            return horarios
        },
        diaSemana: function(dateString) {
            const days = [
                'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
            ];
            const date = new Date(dateString);
            if (isNaN(date)) return 'Invalid date'; // Validação básica
            return days[date.getDay()];
        },
        statusPermuta:function(status){
            switch (status) {
                case 0: return "Pendente";
                case 1: return "Aberto";
                case 2: return "Finalizado"
            }
        },
        corPermuta: function(status){
            switch (status) {
                case 0: return "#DCDCDC";
                case 1: return "#FFC0CB";
                case 2: return "#90EE90"
            }
        },
        igual:function (a,b){
            return a === b
        }
    }
}));
servidor.set('view engine', 'handlebars');

//Body Parser
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(bodyParser.json());

//Pasta de Arquivos Estásticos
const __dirname = path.dirname(fileURLToPath(import.meta.url));
servidor.use(express.static(path.join(__dirname, 'public')));

///////////////////
//ROTAS DO SISTEMA
///////////////////

servidor.get("/", (req, res) => {
    res.redirect('/permuta/listar')
})

//Grupos de Rotas
import principal from './routes/principal.js'
servidor.use('/principal', principal);

import permuta from './routes/permuta.js'
servidor.use('/permuta', permuta);

import usuario from './routes/usuario.js'
servidor.use('/usuario', usuario);

import professor from './routes/professor.js'
servidor.use('/professor', professor)

servidor.listen(PORTA, () => console.log("Servidor iniciado em http://localhost:"+PORTA))