import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from '../componentes/livro/livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  // Services são os arquivos onde realizamos as requisições da aplicação
  private API_URL = "http://localhost:3000/livros"

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
}
