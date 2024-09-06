import { Endpoint } from './../../../Negocio/Endpoint';
import { Router } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa, ViewEmpresas } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { Overlay } from '@angular/cdk/overlay';
import { LoginService } from 'src/app/services/login.service';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { EmpresaCreateComponent } from '../modal/empresa-create/empresa-create.component';
import { UsuarioReadComponent } from '../../usuario/usuario-read/usuario-read.component';
import { ProductReadComponent } from '../../product/product-read/product-read.component';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  empresa: Empresa[] = new Array();
  empresas: ViewEmpresas[] = new Array();
  //contato: Contato;
  //endereco: Endereco;
  //Colunas do GRID
  displayedColumns = ['id', 'cpfCnpj', 'razaoSocial', 'nomeFantasia', 'inscricaoEstadual', 'inscricaoMunicipal', 'status', 'action']

  idSelecionado: Number = 0;

  constructor(private router: Router,
    private serviceEmpresa: ServiceAllService<Empresa>,
    public dialog: MatDialog,
    private _utilService: UtilService,
    private overlay: Overlay,
    private auth: LoginService
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

    this.serviceEmpresa.read(Endpoint.Empresa + `/estabelecimento/${this.auth.dadosUsuario.EmpresaId}`).subscribe(emp => {
      this.empresas = filtroEmpresa != null ? emp.filter(x => x.razaoSocial.toLowerCase().includes(filtroEmpresa.toLowerCase())) : emp
    })

  }

  public CadastrarEmpresa(): void {

    if (this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.Administrador || this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.MasterEmpresa) {
      this._utilService.Popup("", EmpresaCreateComponent, '730px', 'auto')
        .subscribe(() => {
          this.buscarEmpresa();
        })
    } else {
      this._utilService.showMessage("Você não possui permissão para criação de empresas", true);
    }
  }


  public EditarEmpresa(id: number): void {

    if (this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.Administrador || this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.MasterEmpresa) {
      this._utilService.Popup(id, EmpresaCreateComponent, "730px", "auto")
        .subscribe(() => {
          this.buscarEmpresa();
        })
    } else {
      this._utilService.showMessage("Você não possui permissão para alterar cadastro de empresas", true);
    }
  }

  public Usuarios(id: number): void {
    this._utilService.Popup(id, UsuarioReadComponent, "auto", "auto")
  }


  public Produtos(id: number): void {
    this._utilService.Popup(id, ProductReadComponent, "auto", "auto")
  }

}








