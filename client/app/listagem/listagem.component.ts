import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html' 
})
export class ListagemComponent { 

  fotos: FotoComponent[] = [];
  service: FotoService;
  message: string = '';

  constructor(service: FotoService) {
    this.service = service
    this.service.list()
      .subscribe(
        fotos => this.fotos = fotos,
        erro => console.log(erro)
      );
  }

  remove(foto: FotoComponent): void {
    this.service.delete(foto).subscribe(
      fotos => {
        let newList = this.fotos.slice(0);
        let fotoIndex = newList.indexOf(foto);
        newList.splice(fotoIndex, 1);
        this.fotos = newList;
        this.message = 'Foto removida com sucesso';
      },
      erro => {
        console.log(erro);
        this.message = 'Não foi possível remover a foto';
      }
    );
  }
}
