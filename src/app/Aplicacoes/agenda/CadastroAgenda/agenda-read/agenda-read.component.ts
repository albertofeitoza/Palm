
import { Aplicacao } from '../../../../Negocio/Aplicacao';
import { UtilService } from '../../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { AgendaDto } from 'src/app/models/Agenda/modelRetornoAgenda';
import { MatDialog } from '@angular/material/dialog';
import { AgendaCreateComponent } from '../agenda-create/agenda-create.component';
import { Overlay } from '@angular/cdk/overlay';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { AgendaCadastroUnidadeComponent } from '../../Unidade/agenda-cadastro-unidade/agenda-cadastro-unidade.component';




@Component({
  selector: 'app-agenda-read',
  templateUrl: './agenda-read.component.html',
  styleUrls: ['./agenda-read.component.css']
})
export class AgendaReadComponent implements OnInit {

  constructor(
              public dialog: MatDialog,
              public overlay : Overlay,
              private servico : UtilService,
              private _repAgenda : ServiceAllService<AgendaDto>,

             ) { }

  ngOnInit(): void {
    this.servico.AtualizarMenu(Aplicacao.Agenda,'app_registration','');
  }

  addNovaAgenda() {
   
    if(this.servico.Sessao().idGrupoUsuario == TipoUsuario.Master || this.servico.Sessao().idGrupoUsuario == TipoUsuario.Administrador)
    {
      this.servico.Popup("0",AgendaCreateComponent, '80%','98%' );

    }else{
      this.servico.showMessage("Solicitar ao um Usuário Master para criar Nova Agenda!",true);
    }


  }

  addUnidade(){
    
    if(this.servico.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this.servico.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
      this.servico.Popup("0", AgendaCadastroUnidadeComponent, "800px", "600px", )
    else
      this.servico.showMessage("Solicitar ao um Usuário Master cadastrar a Unidade",true);
  }

}
