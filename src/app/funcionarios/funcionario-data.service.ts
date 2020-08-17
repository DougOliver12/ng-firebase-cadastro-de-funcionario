import { Injectable } from '@angular/core';
import { Funcionario } from './funcionario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioDataService {

  constructor() { }

  private funcionarioSource = new BehaviorSubject({ funcionario: null, key: '' });
  funcionarioAtual = this.funcionarioSource.asObservable();


  obtemFuncionario(funcionario: Funcionario, key: string) {
    this.funcionarioSource.next({ funcionario: funcionario, key: key });
  }

}
