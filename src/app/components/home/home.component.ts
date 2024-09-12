import { PermissaoUsuario } from './../../models/produtos/produtoEmpresa.model';
import { UtilService } from '../../services/util.service';
import { Endpoint } from '../../Negocio/Endpoint';
import { ServiceAllService } from '../../services/service-all.service';
import { HeaderService } from '../template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Solucoes } from 'src/app/models/produtos/produtoEmpresa.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  solucoes: Solucoes[] = new Array();


  constructor(private serviceSolucoes: ServiceAllService<any>,
    private headerService: HeaderService,
    private utilService: UtilService,
    private auth: LoginService
  ) {
    // this.headerService.headerData = {
    //  title : 'Início',
    //    icon : 'home',
    //    routeUrl : ''
    // }
  }

  ngOnInit(): void {
    this.ObterSolucoes();
    this.utilService.AtualizarMenu("Início", "home", '');
  }


  private ObterSolucoes(): void {

    this.serviceSolucoes.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.auth.dadosUsuario.EmpresaId}/${this.auth.dadosUsuario.IdUsuario}`)
      .subscribe((solucoes: Solucoes[]) => {
        this.solucoes = solucoes
      });
  }
}
