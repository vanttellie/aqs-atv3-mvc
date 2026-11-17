const Tarefa = require('../models/Tarefa');

class TarefaController {
  static listar(req, res) {
    const filtro = req.query.filtro || 'todas';
    const tarefas = Tarefa.listar(filtro);
    res.render('tarefas/index', { tarefas, filtro, erro: null });
  }

  static telaNova(req, res) {
    res.render('tarefas/novo', { erro: null, dados: {} });
  }

  static cadastrar(req, res) {
    try {
      const { titulo, descricao, disciplina } = req.body;
      Tarefa.criar({ titulo, descricao, disciplina });
      res.redirect('/tarefas');
    } catch (err) {
      res.render('tarefas/novo', {
        erro: err.message,
        dados: req.body
      });
    }
  }

  static detalhar(req, res) {
    const { id } = req.params;
    const tarefa = Tarefa.buscarPorId(id);
    if (!tarefa) {
      return res.redirect('/tarefas');
    }
    res.render('tarefas/detalhes', { tarefa });
  }

  static telaEditar(req, res) {
    const { id } = req.params;
    const tarefa = Tarefa.buscarPorId(id);
    if (!tarefa) {
      return res.redirect('/tarefas');
    }
    res.render('tarefas/editar', { tarefa, erro: null });
  }

  static atualizar(req, res) {
    const { id } = req.params;
    try {
      const { titulo, descricao, disciplina } = req.body;
      Tarefa.atualizar(id, { titulo, descricao, disciplina });
      res.redirect('/tarefas');
    } catch (err) {
      const tarefa = Tarefa.buscarPorId(id) || { id, ...req.body };
      res.render('tarefas/editar', {
        tarefa: { ...tarefa, ...req.body },
        erro: err.message
      });
    }
  }

  static concluir(req, res) {
    const { id } = req.params;
    try {
      Tarefa.concluir(id);
    } catch (err) {
      console.error(err.message);
    }
    res.redirect('/tarefas');
  }

  static excluir(req, res) {
    const { id } = req.params;
    try {
      Tarefa.excluir(id);
    } catch (err) {
      console.error(err.message);
    }
    res.redirect('/tarefas');
  }
}

module.exports = TarefaController;