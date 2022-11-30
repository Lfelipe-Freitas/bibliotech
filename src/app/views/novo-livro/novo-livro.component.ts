import { BibliotecLivro } from 'src/app/models/bibliotecLivro';
import { BibliotecLivroService } from './../../services/bibliotec-livro.service';
import { Bibliotec } from 'src/app/models/bibliotec';
import { Component, OnInit } from '@angular/core';
import { UploadService } from './../../services/upload.service';
import { Router } from '@angular/router';
import { BibliotecService } from '../../services/bibliotec.service';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-livro',
  templateUrl: './novo-livro.component.html',
  styleUrls: ['./novo-livro.component.css']
})
export class NovoLivroComponent implements OnInit {
  public formBibliotec: FormGroup;

  public isLoadUpload: boolean = false;
  private capaUrl: string = "";

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bibliotecService: BibliotecService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.formBibliotec = fb.group({
      titulo: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      capa: [""],
    });
  }

  ngOnInit(): void {
  }

  public createBibliotec(): void {
    if(this.formBibliotec.valid) {
      const bibliotec: Bibliotec = this.formBibliotec.value;
      bibliotec.capaUrl = this.capaUrl;
      this.bibliotecService.createBibliotec(bibliotec).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((capaUrl: string) => {
        this.capaUrl = capaUrl;
      })
    });
  }
}
