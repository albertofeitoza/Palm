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


const routes: Routes = [
  {
    path : "",
    component:HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component : ProductCreateComponent
  },
  {
    path: "products/update/:id",
    component : ProductUpdateComponent
  },
  {
    path: "products/delete/:id",
    component : ProductDeleteComponent
  },
  {
    path: "usuarios",
    component : UsuarioCrudComponent
  },
  {
    path: "usuarios/create",
    component : UsuarioCreateComponent
  },
  {
    path: "usuarios/update/:id",
    component : UsuarioUpdateComponent
  },
  {
    path: "usuarios/delete/:id",
    component : UsuarioDeleteComponent
  },
  {
    path: "chamados",
    component : ChamadoCrudComponent
  },
  {
    path: "chamados/create",
    component : ChamadoCreateComponent
  },
  {
    path: "chamados/update/:id",
    component : ChamadoUpdateComponent
  },
  {
    path: "chamados/delete/:id",
    component : ChamadoDeleteComponent
  },

  //Rotas de empresa
  {
    path: "empresa",
    component : EmpresaComponent
  },
  {
    path: "empresa/create",
    component : EmpresaCreateComponent
  },
  {
    path: "empresa/update/:id",
    component : EmpresaUpdateComponent
  },
  {
    path: "empresa/delete/:id",
    component : ChamadoDeleteComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
