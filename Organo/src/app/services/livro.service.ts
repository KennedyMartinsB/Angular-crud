import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  // Services são os arquivos onde realizamos as requisições da aplicação
  private API_URL = "http://localhost:3000/livros"

  generos: GeneroLiterario[] = [
    { id: 'romance', value: 'Romance' },
    { id: 'misterio', value: 'Mistério' },
    { id: 'fantasia', value: 'Fantasia' },
    { id: 'ficcao-cientifica', value: 'Ficção Científica' },
    { id: 'tecnicos', value: 'Técnicos' }
  ];


  // Para requisições utilizamos o httpClient
  // No construtor injetamos o httpclient
  constructor(private httpClient: HttpClient) { }

  // Tipando o retorno do getLivros
  // Observable é um fluxo de dados assincrono
  // Oq difere um observable de uma promisse é que
  // ele pode emitir dados diversas vezes durante seu ciclo de vida
  obterLivros(): Observable<Livro[]> {
    // Retornando um array de livros da API
    return this.httpClient.get<Livro[]>(this.API_URL);
    // return this.httpClient.get(this.API_URL);
  }

  organizarLivroPorGenero(): Observable<Map<string, Livro[]>>{
    // Operador Pipe funciona como um filtro para retornar os campos que precisamos
    // Utilizando o retorno geral
    return this.obterLivros().pipe(
      map((livros: Livro[])=>{
        // esta const irá conter o array de livros por genero
        const livrosPorGenero = new Map<string, Livro[]>();
        // Agora é necessario iterar todo o array e organizar
        // Foreach para listar os livros e guardar o genero
        livros.forEach((livro: Livro)=>{
          const generoId = typeof livro.genero === 'string' ? livro.genero : livro.genero?.id;
          if(generoId){
            // Operador has verifica se no generoId já existe no livrosPorGenero
            if(!livrosPorGenero.has(generoId)){
              livrosPorGenero.set(generoId, [])
            }
            livrosPorGenero.get(generoId)?.push(livro)
          }
        })
        // console.log(livrosPorGenero)
        return livrosPorGenero
      })
    )
  }

  adicionarLivro(novoLivro: Livro): Observable<Livro>{
    // Metodo post do HttpCliente serve para realizar inserções
    // No caso será inserido um objeto do tipo livro que foi tipado pelo <> ao lado do post
    // No metodo post passamos a url e o objeto
    return this.httpClient.post<Livro>(this.API_URL, novoLivro)
  }

  atualizarFavorito(livro: Livro): Observable<Livro> {
    // Utilizaremo o metodo patch para atualização pois ela é em somente um campo
    return this.httpClient.patch<Livro>(`${this.API_URL}/${livro.id}`, {favorito: livro.favorito})
  }

  obterLivroPorId(id: string): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.API_URL}/${id}`)
  }

  editarLivro(livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(`${this.API_URL}/${livro.id}`, livro)
  }
}
