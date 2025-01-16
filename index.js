// index.js
const { AlunoController } = require('./src/controllers/ControllerAluno');
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()


// alunos.adicionarAluno('Fulano','fulano@email.com','84999999999','2','Tec em enfermagem')
// alunos.listarAluno();
alunos.editarAluno('a44459', 'P.Barros','barros@gmail.com', '8499977733','T.I')