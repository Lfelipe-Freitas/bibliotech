import { BibliotecLivroService } from './../../services/bibliotec-livro.service';
import { BibliotecLivro } from './../../models/bibliotecLivro';
import { UploadService } from './../../services/upload.service';
import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-aluguel',
  templateUrl: './novo-aluguel.component.html',
  styleUrls: ['./novo-aluguel.component.css']
})
export class NovoAluguelComponent implements OnInit {

  public formBibliotecLivro: FormGroup;

  public isLoadUpload: boolean = false;
  private capaUrl: string = "";


  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bibliotecLivroService: BibliotecLivroService,
    private router: Router,
  ) {
    this.formBibliotecLivro = fb.group({
      titulo: [""],
      nomeLeitor: [""],
      dataAluguel: [""]
    });
  }

  ngOnInit(): void {
  }

  public createBibliotecLivro(): void {
    if(this.formBibliotecLivro.valid) {
      const bibliotecLivro: BibliotecLivro = this.formBibliotecLivro.value;
      let trocaStatus: BibliotecLivro = this.formBibliotecLivro.value
      trocaStatus.status = "Alugado"
      this.bibliotecLivroService.createBibliotecLivro(bibliotecLivro).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.router.navigate(["alugueis"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }
  
}
