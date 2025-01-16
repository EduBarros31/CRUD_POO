// Importações
const { pool } = require("../config/database");
const { Aluno } = require("../models/Aluno");
const { Curso } = require("../models/Curso"); // <== Adicione esta linha

class AlunoController {
    async adicionarAluno(nome, email, telefone, matricula, curso) {
        try {
            const consultaAluno = `select * from aluno
            where matricula = #1  `
            const Valores = [ matricula ]
            const resposta = await pool.query(consultaAluno,Valores)
            console.log(res.rows[0])
            const consulta = `insert into aluno (nome, email, telefone, matricula, curso ) 
values ($1, $2, $3, $4, $5) RETURNING *`
            const valores = [nome, email, telefone, matricula, curso]
            const  res  = await pool.query(consulta, valores);
            console.table(res.rows[0])
        } catch (error) {
            console.error("Erro ao criar aluno:", error.message);
        }
    }

   async editarAluno(matricula, novoNome, novoEmail, novoTelefone,novoCurso) {
        try {
          const consulta = `select * from aluno
          where matricula = $1; `  
          const valores = [ matricula];
          const resposta = await pool.query(consulta, valores)
          if(resposta.rows.length === 0){
            return console.error('Aluno nao encontrado', error.message)

          }
          const consultaEditar = `update aluno set
                             nome = $2,
                             email = $3,
                             telefone = $4,
                             curso = $5
                             where matricula = $1  returning *
          `
         const dadosEditados = [matricula, novoNome, novoEmail, novoTelefone,novoCurso]
         const res = await pool.query(consultaEditar,dadosEditados)
         console.log('Dados Editados com sucesso');
         console.table(res.rows[0]);



        } catch (error) {
            console.error("Erro ao editar aluno:", error.message);
        }
    }

    async excluirAluno(matricula) {
        try {
        const consulta = `select * from aluno 
       where matricula = $1'
         
        `
        const valores = [matricula]
        const res = await pool.query(consulta,valores);
        if(res.rows.length === 0){
            return console.error('Aluno nao encontrado', error.message)


        } 
        const consultaDeletar = ` delete from aluno where matricula = $1`
        const resposta = await pool.query(consultaDeletar,valores);
        console.log('Excluido com sucesso');
        console.table(res.rows[0]);

    }catch (error) {
            console.error("Erro ao excluir aluno:", error.message);
        }
    }

    async listarAluno() {
        try {
            const consulta = `select aluno.nome, aluno.email, aluno.telefone, aluno.matricula, aluno.curso from aluno`
            const dados = await pool.query(consulta);
            console.table(dados.rows);
        } catch (error) {
           console.error('erro ao listar aluno', error.message);
        }
    }
}

module.exports = { AlunoController };
