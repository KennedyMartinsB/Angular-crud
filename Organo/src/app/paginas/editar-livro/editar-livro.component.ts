import { Component, OnInit } from '@angular/core';
import { FormularioComponent } from "../../componentes/formulario/formulario.component";
import { Livro } from '../../componentes/livro/livro';
import { LivroService } from '../../services/livro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-livro',
  imports: [FormularioComponent],
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements OnInit{
  livro!: Livro;

  constructor(private livroService: LivroService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Snapshot captura a rota que a pessoa está navegando
    // ParamMap pega um parametro da url que no nosso caso é o Id
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    // console.log("Rota: ",this.activatedRoute.data)
    if(id) {
      this.livroService.obterLivroPorId(id).subscribe((livro) => {
        this.livro = livro
      })
    }
  }

}
