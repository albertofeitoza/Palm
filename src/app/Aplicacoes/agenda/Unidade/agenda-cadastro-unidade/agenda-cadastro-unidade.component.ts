import { getLocaleDateTimeFormat } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Unidade } from '../../../../models/Unidade/unidadeModel';


import { GrupoUsuario } from '../../../../models/usuarios/GrupoUsuarios';
import { AgendaAlterarUnidadeComponent } from '../agenda-alterar-unidade/agenda-alterar-unidade.component';
import { AgendaExcluirUnidadeComponent } from '../agenda-excluir-unidade/agenda-excluir-unidade.component';

@Component({
  selector: 'app-agenda-cadastro-unidade',
  templateUrl: './agenda-cadastro-unidade.component.html',
  styleUrls: ['./agenda-cadastro-unidade.component.css']
})
export class AgendaCadastroUnidadeComponent implements OnInit {

  Colunas = ['id','dtCriacao', 'nomeUnidade','bloqueado','action']


unidade : Unidade = new Unidade

novaUnidade : boolean = false;

unidades : Unidade[];

atualizarChamada: boolean = false;

  constructor(
             public dialog : MatDialogRef<AgendaCadastroUnidadeComponent>,
             private servico : UtilService,
             private ServicoUnidade : ServiceAllService<Unidade>

              ) { }

  ngOnInit(): void {
      this.buscarUnidade("");
  }


  cadUnidade(){
    this.novaUnidade = true;
  }

  addUnidade(){
    
    this.unidade.criadoPor = this.servico.Sessao().UsuarioId;
    this.unidade.dtCriacao = new Date;
    this.unidade.empresaid =  Number(this.servico.Sessao().IdEmpresa);
    
    this.ServicoUnidade.create(this.unidade, Endpoint.Unidade).subscribe(() => {
     this.servico.showMessage("Unidade cadastrada com sucesso", false);
     this.servico.atualizaRota();
     this.novaUnidade = false;
   })

  }

  buscarUnidade(vlrTxt : string){
    
    this.ServicoUnidade.read(Endpoint.Unidade).subscribe(un => {
      this.unidades = vlrTxt == null ? un.filter(x => x.empresaid.toString() == this.servico.Sessao().IdEmpresa) :
                                         un.filter(x => x.empresaid.toString() == this.servico.Sessao().IdEmpresa && x.nomeUnidade.toLowerCase().includes(vlrTxt.toLowerCase()));
    })
    
  }

  AtualizarUnidade(id :string){

    this.servico.Popup(id, AgendaAlterarUnidadeComponent, '500px', '400px');


  }

  ExcluirUnidade(id : string){
    this.servico.Popup(id, AgendaExcluirUnidadeComponent, '500px', '400px');

  }


  fecharPopup(){
      this.dialog.close();
  }
  voltar(){
    this.novaUnidade = false;
  }

  selecionarUnidade(keyEvent : any){

    if (keyEvent.which === 13 || keyEvent.which == 1){
      let vlrTxt =  (<HTMLInputElement>document.getElementById('txtbusca')).value;
      this.buscarUnidade(vlrTxt);
    }
    
    
  }

}
