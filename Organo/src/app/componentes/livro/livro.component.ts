import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { Livro } from './livro';
import { BotaoComponent } from '../botao/botao.component';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro',
  imports: [
    CommonModule,
    BotaoComponent
  ],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

  livro = input.required<Livro>();

  constructor(private livroService: LivroService){

  }

  alternarFavorito() {
    // this.livro().favorito = !this.livro().favorito;
    const livroAtualizado = {...this.livro(), favorito: !this.livro().favorito}
    this.livroService.atualizarFavorito(livroAtualizado).subscribe(() => {
      this.livro().favorito = livroAtualizado.favorito
    })
  }

}
