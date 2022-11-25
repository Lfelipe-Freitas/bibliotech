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

  constructor(private firebaseAuth: AngularFireAuth) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider()
    const promise = this.firebaseAuth.signInWithPopup(provider)
    return from(promise)
  }

  autenticateByEmailAndPassword(user: User) {
    const { email, senha } = user
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)
    return from(promise)
  }
}
