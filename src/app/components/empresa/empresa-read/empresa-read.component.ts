import { Endpoint } from './../../../Negocio/Endpoint';
import { Router } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa, ViewEmpresas } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { Overlay } from '@angular/cdk/overlay';
import { LoginService } from 'src/app/services/login.service';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { EmpresaCreateComponent } from '../modal/empresa-create/empresa-create.component';
import { PessoaReadComponent } from '../../pessoa/pessoa-read/pessoa-read.component';
import { UsuarioReadComponent } from '../../usuario/usuario-read/usuario-read.component';
import { SolucoesComponent } from '../../Solucoes/solucoes-read/solucoes-read.component';
import { SolucoesEmpresaComponent } from '../modal/solucoes-empresa/solucoes-empresa.component';
import { ProdutosEmpresaReadComponent } from '../modal/produtos-empresa/produtos-empresa-read.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  empresa: Empresa[] = new Array();
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  empresas = new MatTableDataSource<ViewEmpresas>();



  // empresas: ViewEmpresas[] = new Array();

  //contato: Contato;
  //endereco: Endereco;
  //Colunas do GRID
  displayedColumns = ['id', 'cpfCnpj', 'razaoSocial', 'nomeFantasia', 'nomeEmpresaPai', 'inscricaoEstadual', 'inscricaoMunicipal', 'status', 'action']
  empresaPai = 0;
  idSelecionado: Number = 0;

  constructor(private router: Router,
    private serviceEmpresa: ServiceAllService<any>,
    public dialog: MatDialog,
    private servico: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.buscarEmpresa();
  }

  selecionaLinha(id: Number) {
    this.idSelecionado = id
  }


  public buscarEmpresa(): void {
    let filtroEmpresa = (<HTMLSelectElement>document.getElementById('busca')).value;
    this.empresaPai = this.servico.Sessao().EmpresaPai;

    this.serviceEmpresa.read(Endpoint.Empresa + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe((emp: ViewEmpresas[]) => {
        this.empresas.data = filtroEmpresa != null ? emp.filter(x => x.razaoSocial.toLowerCase().includes(filtroEmpresa.toLowerCase())) : emp
      })

      this.empresas.paginator = this.paginator
      this.empresas.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Itens por página";
  }

  public CadastrarEmpresa(): void {

    if (this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.Administrador || this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.MasterEmpresa) {
      this.servico.Popup("", EmpresaCreateComponent, '730px', 'auto')
        .subscribe(() => {
          this.buscarEmpresa();
        })
    } else {
      this.servico.showMessage("Você não possui permissão para criação de empresas", true);
    }
  }


  public EditarEmpresa(id: number): void {

    if (this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.Administrador || this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.MasterEmpresa) {
      this.servico.Popup(id, EmpresaCreateComponent, "730px", "auto")
        .subscribe(() => {
          this.buscarEmpresa();
        })
    } else {
      this.servico.showMessage("Você não possui permissão para alterar cadastro de empresas", true);
    }
  }

  public Pessoas(row: any): void {
    if (!row.status) {
      return this.servico.showMessage("Empresa desativada, solicite a ativação", true);
    }

    this.servico.Popup(row.id, PessoaReadComponent, "70%", "63%")
  }

  public Usuarios(row: any): void {

    if (!row.status) {
      return this.servico.showMessage("Empresa desativada, solicite a ativação", true);
    }

    this.servico.Popup(row.id, UsuarioReadComponent, "70%", "67%")
  }

  public ProdutosEmpresa(row: any): void {
    if (!row.status) {
      return this.servico.showMessage("Empresa desativada, solicite a ativação", true);
    }

    this.servico.Popup(row.id, ProdutosEmpresaReadComponent, "75%", "65%")
  }


  public SolucoesEmpresa(row: any): void {
    if (!row.status) {
      return this.servico.showMessage("Empresa desativada, solicite a ativação", true);
    }

    this.servico.Popup(row.id, SolucoesEmpresaComponent, "30%", "70%")
  }

}








