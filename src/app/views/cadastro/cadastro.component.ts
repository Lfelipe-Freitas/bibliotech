import { NotificationService } from '../../services/notification.service';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public formCadastro: FormGroup

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router, private notification: NotificationService) {
    this.formCadastro = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public signInGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(credencials => {
      this.notification.showMessage("Bem-vindo(a)!")
      this.router.navigate(["/home"])
    })
  }

  public createUserEmailAndPassword(): void {
    if(this.formCadastro.valid) {
      const user: User = this.formCadastro.value
    this.authService.createUserEmailAndPassword(user).subscribe(response => {
      this.notification.showMessage("Cadastro realizado co sucesso!")
      this.router.navigate(["/login"])

    })
    }
    else {
      this.notification.showMessage("Dados inválidos")
    }
  }

  ngOnInit(): void {
  }

}

