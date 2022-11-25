import { Bibliotec } from './../models/bibliotec';
import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibliotecService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createBibliotec(bibliotec: Bibliotec): Observable<any> {
    const promise = this.firestore.collection("bibliotec").add(bibliotec);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("bibliotec").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const bibliotec: Bibliotec = doc.data() as Bibliotec;
          bibliotec.id = doc.id;
          return bibliotec;
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
    const promise = this.firestore.collection("bibliotec").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const bibliotec: Bibliotec = doc.data() as Bibliotec;
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

  public deleteBibliotec(id: string) {
    const promise = this.firestore.collection("bibliotec").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateBibliotec(bibliotec: Bibliotec) {
    const promise = this.firestore.collection("bibliotec").doc(bibliotec.id).update(bibliotec);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
