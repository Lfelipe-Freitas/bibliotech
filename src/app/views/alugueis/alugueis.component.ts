import { Status } from './../../models/status';
import { BibliotecLivroService } from './../../services/bibliotec-livro.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from '../../services/notification.service';
import { BibliotecService } from '../../services/bibliotec.service';
import { MatDialog } from '@angular/material/dialog';
import { BibliotecLivro } from 'src/app/models/bibliotecLivro';
import { Livros } from '../../models/livros';



@Component({
  selector: 'app-alugueis',
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.css']
})
export class AlugueisComponent implements OnInit {
  switcher: boolean = true
  displayedColumns = ['titulo','nome-leitor', 'data-aluguel','status', 'excluir'];
  dataSource: BibliotecLivro[] = [];
  status: Status[] = [
    new Status("Alugado", "Alugado"),
    new Status("Devolvido", "Devolvido"),
    new Status("Pendente", "Pendente")
  ]


  constructor(
    private bibliotecLivroService: BibliotecLivroService,
    private notification: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.bibliotecLivroService.findAll().subscribe(bibliotecLivro => {
      this.dataSource = bibliotecLivro;
    });
  }

  public deleteBibliotec(id: string): void {
    this.bibliotecLivroService.deleteBibliotecLivro(id).subscribe(response => {
      this.notification.showMessage("Aluguel deletado.");
      this.initializeTable();
    });
  }

  public hideBibliotec(): void {
    this.switcher = false
  }

}
