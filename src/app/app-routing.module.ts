
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
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
