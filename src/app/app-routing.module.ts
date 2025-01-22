import { PdvReadComponent } from './Aplicacoes/pdv/pdv-read/pdv-read.component';
import { HomeAgendaComponent } from './Aplicacoes/agenda/home-agenda/home-agenda.component';
import { AgendaReadComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-read/agenda-read.component';

import { Aplicacao } from './Negocio/Aplicacao';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";



import { EmpresaReadComponent } from './components/empresa/empresa-read/empresa-read.component';
import { ChamadoReadComponent } from './components/chamados/chamado-read/chamado-read.component';
import { SolucoesComponent } from './components/Solucoes/solucoes-read/solucoes-read.component';


//Rotas de componentes Negócio

const routes: Routes = [
  {path : '', component:HomeComponent },
  {path: "login", component: LoginComponent },
  //Rotas de associação de produto a empresa  cadastroproduto
  {path: "solucoes", component: SolucoesComponent },
  //Rotas de usuarios
  //Rotas de chamados
  {path: "chamados", component : ChamadoReadComponent },

  //Rotas de empresa
  {path: "empresa", component : EmpresaReadComponent },


  //Rotas das APlicações
  //Agenda
  { path: Aplicacao.Agenda, component: HomeAgendaComponent },
  { path: Aplicacao.Agenda + "?", component: AgendaReadComponent },
  { path: Aplicacao.Pdv, component: PdvReadComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
