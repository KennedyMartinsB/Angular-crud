import { Component } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../componentes/livro/livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-livro',
  imports: [],
  templateUrl: './criar-livro.component.html',
  styleUrl: './criar-livro.component.css'
})
export class CriarLivroComponent {

  // Importando serviço dos livros
  // Importando router para realizar o redirecionamento da pagina
  constructor(private livrosService: LivroService, private router: Router) {}

  // Função criar livro ira receber um observable então precisamos
  // Realizar a ação de subscribe
  criarLivro(novoLivro: Livro){
    this.livrosService.adicionarLivro(novoLivro).subscribe(() => {
      // redirecionamento para o component/page de listagem de livros
      this.router.navigate(['lista-livros'])
    })
  }

}
