import { HomeAgendaComponent } from './Aplicacoes/agenda/home-agenda/home-agenda.component';
import { AgendaReadComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-read/agenda-read.component';

import { Aplicacao } from './Negocio/Aplicacao';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { UsuarioCrudComponent } from './views/usuario-crud/usuario-crud.component';



import { ChamadoCrudComponent } from './views/chamado-crud/chamado-crud.component';
import { EmpresaReadComponent } from './components/empresa/empresa-read/empresa-read.component';


//Rotas de componentes Negócio

const routes: Routes = [
  {path : "", component:HomeComponent },
  {path: "login", component: LoginComponent },
  //Rotas de associação de produto a empresa  cadastroproduto
  {path: "produtoempresa", component: ProductCrudComponent },

  //{path: "cadastroproduto", component: ProductCrudComponent },

  //Rotas de usuarios
  {path: 'usuarios', component : UsuarioCrudComponent },

  //Rotas de chamados
  {path: "chamados", component : ChamadoCrudComponent },

  //Rotas de empresa
  {path: "empresa", component : EmpresaReadComponent },

  

  //Rotas das APlicações
  //Agenda
  {path: Aplicacao.Agenda , component : HomeAgendaComponent},
  {path: Aplicacao.Agenda+"?" , component : AgendaReadComponent}
      
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
