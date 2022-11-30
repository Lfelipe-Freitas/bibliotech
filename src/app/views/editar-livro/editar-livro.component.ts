import { Bibliotec } from 'src/app/models/bibliotec';
import { Component, OnInit } from '@angular/core';
import { UploadService } from './../../services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliotecService } from '../../services/bibliotec.service';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css']
})
export class EditarLivroComponent implements OnInit {

  public bibliotec!: Bibliotec;

  public isLoadUpload: boolean = false;

  constructor(
    private notification: NotificationService,
    private bibliotecService: BibliotecService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  private initilizeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.bibliotecService.findById(id).subscribe(bibliotec => {
      this.bibliotec = bibliotec;
    });
  }

  public updateBibliotec(form: NgForm): void {
    if(form.valid) {
      this.bibliotecService.updateBibliotec(this.bibliotec).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
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
        this.bibliotec.capaUrl = capaUrl;
      })
    });
  }

}
