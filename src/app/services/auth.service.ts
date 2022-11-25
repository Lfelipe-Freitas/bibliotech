import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, EMPTY } from 'rxjs';
import {GoogleAuthProvider } from 'firebase/auth';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
    private notification: NotificationService) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider()
    const promise = this.firebaseAuth.signInWithPopup(provider)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Ocorreu um erro :(")
        console.error(error)
        return EMPTY
      })
    )
  }

  autenticateByEmailAndPassword(user: User) {
    const { email, senha } = user
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          this.notification.showMessage("usuário não encontrado!")
        }
        else if(error.code == "auth/wrong-password") {
          this.notification.showMessage("Senha incorreta!")
        }
        else {
          this.notification.showMessage("Erro ao autenticar")
          console.error(error)
        }
        return EMPTY
      })
    )
  }

  createUserEmailAndPassword(user: User): Observable<any> {
    const { email, senha } = user
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar o usuário")
        console.error(error)
        return EMPTY
      })
    )
  }

  logout() {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }
}
