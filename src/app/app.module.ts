import { LoginService } from './services/login.service';
import { UtilService } from './services/util.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { UsuarioCrudComponent } from './views/usuario-crud/usuario-crud.component';

import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from  '@angular/common';
import { LoginComponent } from './components/login/login.component';




registerLocaleData(localePt);

//Modulos Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { ProductReadComponent } from './components/product/product-read/product-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { RedDirective } from './diretivas/red.directive';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { ChamadoCrudComponent } from './views/chamado-crud/chamado-crud.component';
import { ChamadoCreateComponent } from './components/chamados/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamados/chamado-update/chamado-update.component';
import { ChamadoDeleteComponent } from './components/chamados/chamado-delete/chamado-delete.component';
import { ChamadoReadComponent } from './components/chamados/chamado-read/chamado-read.component';
import { EmpresaComponent } from './views/empresa/empresa.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { EmpresaReadComponent } from './components/empresa/empresa-read/empresa-read.component';
import { AgendaUpdateComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-update/agenda-update.component';
import { AgendaDeleteComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-delete/agenda-delete.component';
import { AgendaCreateComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-create/agenda-create.component';
import { AgendaReadComponent } from './Aplicacoes/agenda/CadastroAgenda/agenda-read/agenda-read.component';
import { HomeAgendaComponent } from './Aplicacoes/agenda/home-agenda/home-agenda.component';
import { AgendaCadastroUnidadeComponent } from './Aplicacoes/agenda/Unidade/agenda-cadastro-unidade/agenda-cadastro-unidade.component';
import { AgendaAlterarUnidadeComponent } from './Aplicacoes/agenda/Unidade/agenda-alterar-unidade/agenda-alterar-unidade.component';
import { AgendaExcluirUnidadeComponent } from './Aplicacoes/agenda/Unidade/agenda-excluir-unidade/agenda-excluir-unidade.component';
import { UnidadeSalaCadastroComponent } from './Aplicacoes/agenda/Unidade/Sala/unidade-sala-cadastro/unidade-sala-cadastro.component';
import { UnidadeSalaUpdateComponent } from './Aplicacoes/agenda/Unidade/Sala/unidade-sala-update/unidade-sala-update.component';
import { UnidadeSalaDeleteComponent } from './Aplicacoes/agenda/Unidade/Sala/unidade-sala-delete/unidade-sala-delete.component';
import { AgendaGrupoCadastroComponent } from './Aplicacoes/agenda/GrupoAgenda/agenda-grupo-cadastro/agenda-grupo-cadastro.component';
import { AgendaGrupoExcluirComponent } from './Aplicacoes/agenda/GrupoAgenda/agenda-grupo-excluir/agenda-grupo-excluir.component';
import { AgendaGrupoUpdateComponent } from './Aplicacoes/agenda/GrupoAgenda/agenda-grupo-update/agenda-grupo-update.component';
import { AgendamentosReadComponent } from './Aplicacoes/agenda/Agendamentos/agendamentos-read/agendamentos-read.component';
import { AgendamentosCreateComponent } from './Aplicacoes/agenda/Agendamentos/agendamentos-create/agendamentos-create.component';
import { DadosAgendamentoComponent } from './Aplicacoes/agenda/Agendamentos/dados-agendamento/dados-agendamento.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { PessoaUpdateComponent } from './components/pessoa/pessoa-update/pessoa-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ProductCrudComponent,
    ProductCreateComponent,
    ProductReadComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    LoginComponent,
    RedDirective,
    UsuarioCrudComponent,
    UsuarioComponent,
    UsuarioReadComponent,
    UsuarioCreateComponent,
    UsuarioDeleteComponent,
    UsuarioUpdateComponent,
    ChamadoCrudComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoDeleteComponent,
    ChamadoReadComponent,
    EmpresaComponent,
    EmpresaCreateComponent,
    EmpresaUpdateComponent,
    EmpresaDeleteComponent,
    EmpresaReadComponent,
    AgendaUpdateComponent,
    AgendaDeleteComponent,
    AgendaCreateComponent,
    AgendaReadComponent,
    HomeAgendaComponent,
    AgendaCadastroUnidadeComponent,
    AgendaAlterarUnidadeComponent,
    AgendaExcluirUnidadeComponent,
    UnidadeSalaCadastroComponent,
    UnidadeSalaUpdateComponent,
    UnidadeSalaDeleteComponent,
    AgendaGrupoCadastroComponent,
    AgendaGrupoExcluirComponent,
    AgendaGrupoUpdateComponent,
    AgendamentosReadComponent,
    AgendamentosCreateComponent,
    DadosAgendamentoComponent,
    PessoaComponent,
    PessoaUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: 
  [
    {
    provide : LOCALE_ID,
    useValue : 'pt-BR',
    },
  [
    LoginService,
  ],
 ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
