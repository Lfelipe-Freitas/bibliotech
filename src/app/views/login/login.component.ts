import { Router } from '@angular/router';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.formLogin = fb.group({
      email: ['', [Validators.required]],
      senha: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credencials => {
      alert("Bem-vindo(a)")
      this.router.navigate(["/home"])
    })
  }

  public signInEmailAndPassword(): void {
    if(this.formLogin.valid) {
      const user: User = this.formLogin.value
    this.authService.autenticateByEmailAndPassword(user).subscribe(credentials => {
      alert("Bem-vindo(a)")
      this.router.navigate(["/home"])
    })
    }
    else {
      alert("Dados inválidos")
    }
  }
}
