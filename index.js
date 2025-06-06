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
    resave: true,
    secret: "iambatman",
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
        eq: (a, b) => a === b, // Compara dois valores
        or: (a, b) => a || b,
        len: function (lista){
            return lista.length
        } ,
        formatDate: function (date) {
            const d =  new Date(date)
            d.setDate(d.getDate() + 1)
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
        diaSemana: function(dia) {
            const days = [
                'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado','Domingo',
            ];
            // const date = new Date(dateString);
            // if (isNaN(date)) return 'Invalid date'; // Validação básica
            return days[dia];
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
                case 0: return "#F0F8FF";
                case 1: return "WHITE";
                case 2: return "#F0FFF0";
                case 3: return "WHITE";
            }
        },
        igual:function (a,b){
            return a === b
        },
        diferente:function (a,b){
            return a !== b
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

import diario from './routes/diario.js'
servidor.use('/diario', diario)

import turma from './routes/turma.js'
servidor.use('/turma', turma)

import curso from './routes/curso.js'
servidor.use('/curso', curso)

import calendario from './routes/calendario.js'
servidor.use('/calendario', calendario)

import dia from './routes/dia.js'
servidor.use('/dia', dia)

servidor.listen(PORTA, () => console.log("Servidor iniciado em http://localhost:"+PORTA))