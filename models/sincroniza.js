import Professor from "./Professor.js";
import Usuario from "./Usuario.js";
import Curso from "./Curso.js";
import Turma from "./Turma.js";
import Diario from "./Diario.js";
import Permuta from "./Permuta.js";
import Calendario from "./Calendario.js";
import Dia from "./Dia.js";
import Horario from "./Horario.js";
import Discente from "./Discente.js";

import Aluno from "./Aluno.js";
import Modalidade from "./Modalidade.js";
import Time from "./Time.js";
import Membro from "./Membro.js";
import Ingresso from "./Ingresso.js";

await Professor.sync()
await Usuario.sync()
await Curso.sync()
await Calendario.sync()
await Turma.sync()
await Diario.sync()
await Permuta.sync()
await Dia.sync()
await Horario.sync()
await Discente.sync()

await Ingresso.sync()
await Aluno.sync()
await Modalidade.sync()
await Time.sync()
await Membro.sync()