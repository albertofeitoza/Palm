import { UtilService } from '../../services/util.service';
import { Endpoint } from '../../Negocio/Endpoint';
import { ServiceAllService } from '../../services/service-all.service';
import { HeaderService } from '../template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Solucoes } from 'src/app/models/Solucoes/Solucoes';
import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { UsuarioCreateComponent } from '../usuario/usuario-create/usuario-create.component';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';

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
    // private auth: LoginService
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

    if (this.servico.Sessao().TipoUsuarioLogado === TipoUsuario.Administrador) {
      this.serviceSolucoes.read(Endpoint.Solucoes + `/estabelecimento/${0}`)
        .subscribe((result: Solucoes[]) => {

          this.solucoes = new Array();

          result.forEach(em => {
            let solucaoEmp: SolucoesEmpresa = new SolucoesEmpresa()
            solucaoEmp.id = em.id
            solucaoEmp.solucaoId = 0;
            solucaoEmp.solucaoNome = em.nome
            solucaoEmp.solucaoRota = em.rota
            solucaoEmp.empresaId = 0
            solucaoEmp.ativo = em.ativo

            this.solucoes.push(solucaoEmp)

          })

        })
    } else {
      this.serviceSolucoes.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.servico.Sessao().EmpresaId}/${this.servico.Sessao().IdUsuario}`)
        .subscribe((solucoes: SolucoesEmpresa[]) => {
          this.solucoes = solucoes
        });
    }
  }

  public DadosUsuario(): void {

    const dados = {
      acao: 'idIsuario',
      id: this.servico.Sessao().IdUsuario,
      perfil: 'perfil'
    }
    this.servico.Popup('', UsuarioCreateComponent, "35%", '60%', false, dados)

  }

}
