import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formCadastro: FormGroup

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formCadastro = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credencials => {

      this.router.navigate(["/home"])
    })
  }

  public createUserEmailAndPassword(): void {
    if(this.formCadastro.valid) {
      const user: User = this.formCadastro.value
    this.authService.autenticateByEmailAndPassword(user).subscribe(response => {
      alert("Logado com sucesso!")
      this.router.navigate(["/login"])

    })
    }
    else {
      alert("Falha no login")
    }
  }

  ngOnInit(): void {
  }

}

