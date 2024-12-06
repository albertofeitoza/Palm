import { UtilService } from '../../services/util.service';
import { Endpoint } from '../../Negocio/Endpoint';
import { ServiceAllService } from '../../services/service-all.service';
import { HeaderService } from '../template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Solucoes } from 'src/app/models/Solucoes/Solucoes';
import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { UsuarioCreateComponent } from '../usuario/usuario-create/usuario-create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  solucoes: SolucoesEmpresa[] = new Array();
  constructor(private serviceSolucoes: ServiceAllService<any>,
    private headerService: HeaderService,
    private servico: UtilService,
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
    this.servico.AtualizarMenu("Início", "home", '');
  }


  private ObterSolucoes(): void {

    this.serviceSolucoes.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.auth.dadosUsuario.EmpresaId}/${this.auth.dadosUsuario.IdUsuario}`)
      .subscribe((solucoes: SolucoesEmpresa[]) => {
        this.solucoes = solucoes
      });
  }

  public DadosUsuario(): void {

    const dados = {
      acao: 'idIsuario',
      id: this.servico.Sessao().IdUsuario,
      perfil : 'perfil'
    }
    this.servico.Popup('', UsuarioCreateComponent, "35%", '60%', false, dados)

  }

}
