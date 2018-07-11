import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html' 
})
export class CadastroComponent { 

  foto: FotoComponent = new FotoComponent();
  http: Http;
  meuForm: FormGroup;
  service: FotoService;
  message: string = '';
  route: ActivatedRoute;
  router: Router;

  constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {
    this.service = service;
    this.route = route;
    this.router = router;

    this.route.params.subscribe(params => {
      let id = params[`id`];
      if(id) {
        this.service.findById(id)
          .subscribe(
            foto => this.foto = foto,
            erro => console.log(erro)
          );
      }
    });

    this.meuForm = fb.group({
      titulo: ['', Validators.compose(
        [Validators.required, Validators.minLength(4)]
      )],
      url: ['', Validators.required],
      descricao: [''],
    });
  }

  cadastrar(event) {
    event.preventDefault();
    console.log(this.foto);

    this.service.add(this.foto)
      .subscribe(res => {
        this.message = res.message;
        this.foto = new FotoComponent();
        if(res.edit) this.router.navigate(['']);
      }, erro => {
        console.log(erro);
        this.message = 'Não foi possível salvar a foto.';
      });
  }
}