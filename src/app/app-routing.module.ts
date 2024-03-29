import { HomeAgendaComponent } from './Aplicacoes/agenda/home-agenda/home-agenda.component';
import { AgendaReadComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-read/agenda-read.component';
import { AgendaDeleteComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-delete/agenda-delete.component';
import { AgendaUpdateComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-update/agenda-update.component';
import { AgendaCreateComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-create/agenda-create.component';

import { Aplicacao } from './Negocio/Aplicacao';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaComponent } from './views/empresa/empresa.component';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { UsuarioCrudComponent } from './views/usuario-crud/usuario-crud.component';

import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';

import { ChamadoCrudComponent } from './views/chamado-crud/chamado-crud.component';
import { ChamadoCreateComponent } from './components/chamados/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamados/chamado-update/chamado-update.component';
import { ChamadoDeleteComponent } from './components/chamados/chamado-delete/chamado-delete.component';


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
  {path: "empresa", component : EmpresaComponent },

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
