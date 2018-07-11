import { Http, Headers, Response } from '@angular/http'; 
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';

@Injectable()
export class FotoService {
  http: Http;
  headers: Headers;
  url: string = 'v1/fotos';

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
  }

  add(foto: FotoComponent): Observable<MensagemCadastro> {
    if(foto._id) {
      return this.http.put(
        `${this.url}/${foto._id}`,
        JSON.stringify(foto),
        { headers: this.headers }
      ).map(() => new MensagemCadastro('Foto alterada com sucesso', true));
    } else {
      return this.http.post(
        this.url,
        JSON.stringify(foto),
        { headers: this.headers }
      ).map(() => new MensagemCadastro('Foto incluida com sucesso', false));
    }
  }

  list(): Observable<FotoComponent[]> {
    return this.http.get(this.url).map(res => res.json());
  }

  delete(foto: FotoComponent): Observable<Response> {
    return this.http.delete(`${this.url}/${foto._id}`)
  }

  findById(id: string): Observable<FotoComponent> {
    return this.http.get(`${this.url}/${id}`)
                    .map(res => res.json());
  }
}

export class MensagemCadastro {
  
  constructor(private _message: string, private _edit: boolean) {
    this._message = _message;
    this._edit = _edit;
  }

  public get message(): string {
    return this._message;
  }

  public get edit(): boolean {
    return this._edit;
  }
}
