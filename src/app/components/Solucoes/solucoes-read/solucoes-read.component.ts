import { SolucoesCreateComponent } from './../modal/solucoes-create/solucoes-create.component';
import { Empresa } from '../../../models/empresa/ModelEmpresa';
import { Router } from '@angular/router';
import { ServiceAllService } from '../../../services/service-all.service';
import { UtilService } from '../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Solucoes } from 'src/app/models/Solucoes/Solucoes';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';

@Component({
  selector: 'app-solucoes-read',
  templateUrl: './solucoes-read.component.html',
  styleUrls: ['./solucoes-read.component.css']
})
export class SolucoesComponent implements OnInit {

  vlrProduto: string

  solucoes: Solucoes[] = new Array()

  displayedColumns = ['id', 'dataCriacao', 'nome', 'rota', 'ativo', 'action']
  idSelecionado: Number = 0;

  constructor(private router: Router,
    private serviceApi: ServiceAllService<any>,
    private servico: UtilService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.BuscarSolucoes();
  }

  private BuscarSolucoes(): void {

    this.serviceApi.read(Endpoint.Solucoes + `/estabelecimento/${0}`)
      .subscribe((result: Solucoes[]) => {
        this.solucoes = result;

      });
  }

  public AdicionarSolucao(): void {

    if (this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.Administrador) {
      this.servico.Popup('', SolucoesCreateComponent, '50%', '45%', true)
        .subscribe((result) => {
          if (result)
            this.servico.showMessage("Solução atualizada!.", false);

          this.BuscarSolucoes();
        })
    } else {
      this.servico.showMessage("Você não possui permissão para associar produtos a uma empresa", true);
    }
  }

  EditarSolucao(id: number) {

    if (this.servico.Sessao().TipoUsuarioLogado == TipoUsuario.Administrador) {
      this.servico.Popup(id, SolucoesCreateComponent, '50%', '45%', true)
        .subscribe((result) => {
        
          if (result)
            this.servico.showMessage("Solução atualizada!.", false);
          
          this.BuscarSolucoes();
        
        })
    } else {
      this.servico.showMessage("Você não possui permissão para associar produtos a uma empresa", true);
    }
  }


  selecionarProduto(KeyEvent: any) {

    if (KeyEvent.which == 13 || KeyEvent.which == 1) {
      this.vlrProduto = (<HTMLInputElement>document.getElementById('txtbusca')).value;


    }
  }

  selecionaLinha(id: Number) {
    this.idSelecionado = id;
  }

}
