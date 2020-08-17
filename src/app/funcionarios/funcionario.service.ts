import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Funcionario } from './funcionario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }

  insert(funcionario: Funcionario) {
    this._angularFireDatabase.list('funcionarios').push(funcionario)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(funcionario: Funcionario, key: string) {
    this._angularFireDatabase.list('funcionarios').update(key, funcionario)
      .catch((error: any) => {
        //console.error(error);
      });
  }

  getAll() {
    return this._angularFireDatabase.list('funcionarios')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({ key: data.payload.key, ...data.payload.val() as {}}));
        })
      );
  }

  delete(key: string) {
    this._angularFireDatabase.object(`funcionarios/${key}`).remove();
  }

}
