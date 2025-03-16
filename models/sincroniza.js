import Professor from "./Professor.js";
import Usuario from "./Usuario.js";
import Curso from "./Curso.js";
import Turma from "./Turma.js";
import Diario from "./Diario.js";
import Permuta from "./Permuta.js";
import Calendario from "./Calendario.js";
import Dia from "./Dia.js";
import Horario from "./Horario.js";

await Professor.sync()
await Usuario.sync()
await Curso.sync()
await Calendario.sync()
await Turma.sync()
await Diario.sync()
await Permuta.sync()
await Dia.sync()
await Horario.sync()