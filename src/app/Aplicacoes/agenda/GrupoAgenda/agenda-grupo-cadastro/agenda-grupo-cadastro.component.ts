import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-grupo-cadastro',
  templateUrl: './agenda-grupo-cadastro.component.html',
  styleUrls: ['./agenda-grupo-cadastro.component.css']
})
export class AgendaGrupoCadastroComponent implements OnInit {

grupo : GrupoAgenda = new GrupoAgenda();

  constructor(
              public dialog : MatDialogRef<AgendaGrupoCadastroComponent>,
              private servico : UtilService,
              private servicoGrupo : ServiceAllService<GrupoAgenda>
              ) { }

  ngOnInit(): void {
  }

  criarGrupo(){

    this.grupo.empresaid = Number(this.servico.Sessao().IdEmpresa)
    this.grupo.dtCriacao =  new Date;
    this.grupo.criadoPor = Number(this.servico.Sessao().UsuarioId);
    this.servicoGrupo.create(this.grupo, Endpoint.GrupoAgenda).subscribe(() => {
      this.servico.showMessage("Grupo criado com sucesso ! ", false )
    })
  }

  fecharPopup(){
      this.dialog.close();
  }

}