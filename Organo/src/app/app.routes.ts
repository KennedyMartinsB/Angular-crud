import { Routes } from '@angular/router';

import { ListaLivrosComponent } from './paginas/lista-livros/lista-livros.component';
import { CriarLivroComponent } from './paginas/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './paginas/editar-livro/editar-livro.component';

export const routes: Routes = [
  {
    path: 'criar-livro',
    component: CriarLivroComponent
  },
  {
    path: 'lista-livros',
    component: ListaLivrosComponent
  },
  {
    path: 'editar-livro/:id',
    component: EditarLivroComponent
  },
  {
    path: '**',
    component: ListaLivrosComponent
  }
];
