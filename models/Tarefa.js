let tarefas = [];
let proximoId = 1;

class Tarefa {
  constructor(id, titulo, descricao, disciplina, status = 'pendente') {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.disciplina = disciplina;
    this.status = status;
  }

  static validar(dados) {
    const erros = [];
    const titulo = dados.titulo ? dados.titulo.trim() : '';
    const descricao = dados.descricao ? dados.descricao.trim() : '';
    const disciplina = dados.disciplina ? dados.disciplina.trim() : '';

    if (!titulo || titulo.length < 3 || titulo.length > 100) {
      erros.push('O título é obrigatório e deve ter entre 3 e 100 caracteres.');
    }

    if (descricao && descricao.length > 500) {
      erros.push('A descrição não pode ultrapassar 500 caracteres.');
    }

    if (!disciplina || disciplina.length < 2 || disciplina.length > 80) {
      erros.push('A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.');
    }

    return {
      valido: erros.length === 0,
      erros
    };
  }

  static criar(dados) {
    const validacao = this.validar(dados);
    if (!validacao.valido) {
      throw new Error(validacao.erros.join(' '));
    }

    const novaTarefa = new Tarefa(
      proximoId++,
      dados.titulo.trim(),
      dados.descricao ? dados.descricao.trim() : '',
      dados.disciplina.trim(),
      'pendente'
    );

    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  static listar(filtro = 'todas') {
    if (filtro === 'pendentes') {
      return tarefas.filter(t => t.status === 'pendente');
    }
    if (filtro === 'concluidas') {
      return tarefas.filter(t => t.status === 'concluida');
    }
    return tarefas;
  }

  static buscarPorId(id) {
    const idNum = parseInt(id, 10);
    return tarefas.find(t => t.id === idNum);
  }

  static atualizar(id, dados) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) {
      throw new Error('Tarefa não encontrada.');
    }

    const validacao = this.validar(dados);
    if (!validacao.valido) {
      throw new Error(validacao.erros.join(' '));
    }

    tarefa.titulo = dados.titulo.trim();
    tarefa.descricao = dados.descricao ? dados.descricao.trim() : '';
    tarefa.disciplina = dados.disciplina.trim();

    return tarefa;
  }

  static concluir(id) {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) {
      throw new Error('Tarefa não encontrada.');
    }
    tarefa.status = 'concluida';
    return tarefa;
  }

  static excluir(id) {
    const idNum = parseInt(id, 10);
    const index = tarefas.findIndex(t => t.id === idNum);
    if (index === -1) {
      throw new Error('Tarefa não encontrada.');
    }
    return tarefas.splice(index, 1)[0];
  }
}

module.exports = Tarefa;