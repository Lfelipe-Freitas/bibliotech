import { Livros } from './../../models/livros';
import { BibliotecLivro } from 'src/app/models/bibliotecLivro';
import { BibliotecLivroService } from './../../services/bibliotec-livro.service';
import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from '../../services/notification.service';
import { BibliotecService } from '../../services/bibliotec.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bibliotec } from 'src/app/models/bibliotec';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['capa', 'titulo', 'genero', 'autor', 'editar', 'excluir'];
  dataSource: Bibliotec[] = [];

  constructor(
    private bibliotecService: BibliotecService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }


  private initializeTable(): void {
    this.bibliotecService.findAll().subscribe(bibliotec => {
      this.dataSource = bibliotec;
    });
  }

  public deleteBibliotec(id: string): void {
    console.log(id)
    this.bibliotecService.deleteBibliotec(id).subscribe(response => {
      this.notification.showMessage("Livro Apagado.");
      this.initializeTable();
    },
    error => {
      console.log(error)
    });
  }

  public openDetails(bibliotec: Bibliotec): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: bibliotec
    })
  }
}
