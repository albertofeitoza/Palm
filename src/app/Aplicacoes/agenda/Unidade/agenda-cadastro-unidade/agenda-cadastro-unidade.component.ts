import { getLocaleDateTimeFormat } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Unidade } from '../../../../models/Unidade/unidadeModel';


import { GrupoUsuario } from '../../../../models/usuarios/GrupoUsuarios';
import { AgendaCreateComponent } from '../../agenda-create/agenda-create.component';
import { AgendaAlterarUnidadeComponent } from '../agenda-alterar-unidade/agenda-alterar-unidade.component';
import { AgendaExcluirUnidadeComponent } from '../agenda-excluir-unidade/agenda-excluir-unidade.component';
import { UnidadeSalaCadastroComponent } from '../Sala/unidade-sala-cadastro/unidade-sala-cadastro.component';
import { UnidadeSalaDeleteComponent } from '../Sala/unidade-sala-delete/unidade-sala-delete.component';
import { UnidadeSalaUpdateComponent } from '../Sala/unidade-sala-update/unidade-sala-update.component';

@Component({
  selector: 'app-agenda-cadastro-unidade',
  templateUrl: './agenda-cadastro-unidade.component.html',
  styleUrls: ['./agenda-cadastro-unidade.component.css']
})
export class AgendaCadastroUnidadeComponent implements OnInit {

Colunas = ['id','dtCriacao', 'nomeUnidade','bloqueado','action']
ColunasSala = ['id','dtCriacao', 'nomeSala', 'ativo','action']

unidade : Unidade = new Unidade

novaUnidade : boolean = false;

unidades : Unidade[];
atualizarChamada: boolean = false; 

vlrsala : string = null;

salas : Sala[];
unidadeSelecionada : number = 0;
  constructor(
             public dialog : MatDialogRef<AgendaCadastroUnidadeComponent>,
             private servico : UtilService,
             private ServicoUnidade : ServiceAllService<Unidade>,
             private servicoSala : ServiceAllService<Sala>

              ) { }

  ngOnInit(): void {
      this.buscarUnidade("");
      
  }


  cadUnidade(){
    this.novaUnidade = true;
  }

  addUnidade(){
    this.unidadeSelecionada = 0;

    this.unidade.criadoPor = this.servico.Sessao().UsuarioId;
    this.unidade.dtCriacao = new Date;
    this.unidade.empresaid =  Number(this.servico.Sessao().IdEmpresa);
    
    this.ServicoUnidade.create(this.unidade, Endpoint.Unidade).subscribe(() => {
     this.servico.showMessage("Unidade cadastrada com sucesso", false);
     this.servico.atualizaRota("agenda", true);
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


  testePopup(){
    this.servico.Popup("",UnidadeSalaCadastroComponent, "500px", "500px");
  }

  UnidadeSelecionada(id){
      this.unidadeSelecionada = id;
  }

  selecionaAba(tab){
      
      if (tab.index == 1)
      {
        this.buscarSala()
        

      }else{
        this.unidadeSelecionada = 0
      }
}


  buscarSala(){
    
    this.servicoSala.read(Endpoint.Sala).subscribe(sl => {
      this.salas = this.vlrsala == null ?   sl.filter(x => x.unidadeid == this.unidadeSelecionada) :
                                            sl.filter(x => x.unidadeid == this.unidadeSelecionada && x.nomeSala.toLowerCase().includes(this.vlrsala.toLowerCase())) 
    })
   

  }
  
  selecionarSala(keyEvent : any){
    
    if (keyEvent.which == 13 || keyEvent.which == 1){
      this.vlrsala =  (<HTMLInputElement>document.getElementById('txtbusca')).value;
    }

    this.buscarSala();

  }
  AtualizarSala(id : any){
      this.servico.Popup(id, UnidadeSalaUpdateComponent, "500px", "400px");
  }

  Excluirsala(id : any){
      this.servico.Popup(id,UnidadeSalaDeleteComponent, "500px", "400px")
  }

  cadsala(){
    this.servico.Popup(this.unidadeSelecionada.toString(), UnidadeSalaCadastroComponent, "500px", "400px"); 
  }

}
