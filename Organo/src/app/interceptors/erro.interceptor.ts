import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MensagemErroService } from '../services/mensagem-erro.service';
import { inject } from '@angular/core';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {

  const mensagemErroService = inject(MensagemErroService)

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      const mensagemErro = 'Ops, ocorreu um erro';
      mensagemErroService.mostrarMensagemDeErro(mensagemErro)
      return throwError(() => erro)
    })
  )
};
