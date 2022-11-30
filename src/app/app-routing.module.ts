import { AlugueisComponent } from './views/alugueis/alugueis.component';
import { NovoAluguelComponent } from './views/novo-aluguel/novo-aluguel.component';
import { EditarLivroComponent } from './views/editar-livro/editar-livro.component';
import { NovoLivroComponent } from './views/novo-livro/novo-livro.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotec"
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    title: "Cadastro | Bibliotec"
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Home | Bibliotec"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: "Dashboard | Bibliotec"
  },
  {
    path: 'alugueis',
    component: AlugueisComponent,
    title: "Aluguéis | Bibliotec"
  },
  {
    path: 'alugueis/novo-aluguel',
    component: NovoAluguelComponent,
    title: "Novo Aluguel | Bibliotec"
  },
  {
    path: 'dashboard/novo-livro',
    component: NovoLivroComponent,
    title: "Novo-livro | Bibliotec"
  },
  {
    path: 'dashboard/editar-livro/:id',
    component: EditarLivroComponent,
    title: "Editar Livro | Bibliotec"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
