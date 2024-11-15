import Professor from "./Professor.js";
import Usuario from "./Usuario.js";
import Curso from "./Curso.js";
import Turma from "./Turma.js";
import Diario from "./Diario.js";
import Permuta from "./Permuta.js";

await Professor.sync()
await Usuario.sync()
await Curso.sync()
await Turma.sync()
await Diario.sync()
await Permuta.sync()