import * as rl from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';
import type { Emprestimo } from '../models/Emprestimo';

export class EmprestimoController {
  private svc = new EmprestimoService();

  async realizarEmprestimo() {
    try {
      const clienteId = rl.questionInt('ID Cliente: ');
      const livroId = rl.questionInt('ID Livro: ');
      const emp = await this.svc.realizarEmprestimo({ clienteId, livroId });
      console.log('✅ Empréstimo criado ID:', emp.id);
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async registrarDevolucao() {
    try {
      const id = rl.questionInt('ID Empréstimo: ');
      await this.svc.registrarDevolucao(id);
      console.log('✅ Devolução registrada');
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async listarEmprestimos() {
    try {
      const lista: Emprestimo[] = await this.svc.listarEmprestimos();
      lista.forEach((e: Emprestimo) => {
        const st = e.dataDevolucao ? 'Devolvido' : 'Pendente';
        console.log(`#${e.id} | Cliente:${e.nomeCliente ?? e.clienteId} | Livro:${e.tituloLivro ?? e.livroId} | ${st}`);
      });
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  // ---------------- RELATÓRIOS ----------------
  async relatorioLivrosDisponiveis() {
    try {
      const lista = await this.svc.livrosDisponiveis();
      lista.forEach((l: any) => console.log(`#${l.id} ${l.titulo} | Estoque:${l.quantidadeEstoque ?? l.quantidade_estoque}`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async relatorioLivrosEmprestados() {
    try {
      const lista = await this.svc.livrosEmprestados();
      lista.forEach((l: any) => console.log(`${l.titulo} | Ativos:${l.total_emprestimos ?? l.total}`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async relatorioLivrosPorAutor() {
    try {
      const lista = await this.svc.livrosPorAutor();
      lista.forEach((r: any) => console.log(`${r.autor} | Livros:${r.total_livros}`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async relatorioEmprestimosPorLivro() {
    try {
      const lista = await this.svc.qtdEmprestimosPorLivro();
      lista.forEach((l: any) => console.log(`${l.titulo} | ${l.total_emprestimos ?? l.total}x`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async relatorioClientesComEmprestimos() {
    try {
      const lista = await this.svc.clientesComEmprestimosAtivos();
      lista.forEach((c: any) => console.log(`#${c.id} ${c.nome} — ${c.email}`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }
}