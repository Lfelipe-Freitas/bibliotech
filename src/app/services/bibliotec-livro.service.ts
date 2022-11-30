import { BibliotecLivro } from './../models/bibliotecLivro';
import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibliotecLivroService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
  ) { }


  public createBibliotecLivro(bibliotecLivro: BibliotecLivro): Observable<any> {
    const promise = this.firestore.collection("bibliotecLivro").add(bibliotecLivro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("bibliotecLivro").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const bibliotecLivro: BibliotecLivro = doc.data() as BibliotecLivro;
          bibliotecLivro.id = doc.id;
          return bibliotecLivro;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("bibliotecLivro").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const bibliotec: BibliotecLivro = doc.data() as BibliotecLivro;
        bibliotec.id = doc.id;
        return bibliotec;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteBibliotecLivro(id: string) {
    const promise = this.firestore.collection("bibliotecLivro").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateBibliotec(bibliotecLivro: BibliotecLivro) {
    const promise = this.firestore.collection("bibliotecLivro").doc(bibliotecLivro.id).update(bibliotecLivro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }



  public updateBibliotecLivro(bibliotecLivro: BibliotecLivro) {
    const promise = this.firestore.collection("bibliotecLivro").doc(bibliotecLivro.id).update(bibliotecLivro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
