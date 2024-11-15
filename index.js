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
    saveUninitialized: false,
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
            const hours = String(d.getHours()).padStart(2, '0')
            const minutes = String(d.getMinutes()).padStart(2, '0')
            const seconds = String(d.getSeconds()).padStart(2, '0')
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        },
        categoriaUsuario: function (categoria){
            switch (categoria) {
                case 0: return "Docente";
                case 1: return "Coordenador";
                case 2: return "Supremo";
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
    res.redirect('/principal')
})

//Grupos de Rotas
import principal from './routes/principal.js'
servidor.use('/principal', principal);

import permuta from './routes/permuta.js'
servidor.use('/permuta', permuta);

import usuario from './routes/usuario.js'
servidor.use('/usuario', usuario);

servidor.listen(PORTA, () => console.log("Servidor iniciado em http://localhost:"+PORTA))