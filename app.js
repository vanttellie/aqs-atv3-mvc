const express = require('express');
const path = require('path');
const TarefaController = require('./controllers/TarefaController');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/tarefas');
});

app.get('/tarefas', TarefaController.listar);
app.get('/tarefas/nova', TarefaController.telaNova);
app.post('/tarefas', TarefaController.cadastrar);
app.get('/tarefas/:id', TarefaController.detalhar);
app.get('/tarefas/:id/editar', TarefaController.telaEditar);
app.post('/tarefas/:id/atualizar', TarefaController.atualizar);
app.post('/tarefas/:id/concluir', TarefaController.concluir);
app.post('/tarefas/:id/excluir', TarefaController.excluir);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});