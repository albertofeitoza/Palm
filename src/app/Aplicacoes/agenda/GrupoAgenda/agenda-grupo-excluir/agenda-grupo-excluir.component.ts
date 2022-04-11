import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-grupo-excluir',
  templateUrl: './agenda-grupo-excluir.component.html',
  styleUrls: ['./agenda-grupo-excluir.component.css']
})
export class AgendaGrupoExcluirComponent implements OnInit {


  grupo : GrupoAgenda;

  constructor(
              public matdialogRef : MatDialogRef<AgendaGrupoExcluirComponent>,
              private servico : UtilService,
              private servicoGrupo : ServiceAllService<GrupoAgenda>
              ) { }

  ngOnInit(): void {
    this.buscarGrupo();
  }

  buscarGrupo(){
    this.servicoGrupo.readById(this.matdialogRef.id, Endpoint.GrupoAgenda).subscribe((x: {}) => {

    })
  }

  excluirGrupo(){
    
      this.servicoGrupo.delete(Number(this.matdialogRef.id), Endpoint.GrupoAgenda).subscribe(x => {
        this.servico.showMessage("Grupo Excluido com sucesso!", false);
      })
  }

  fecharPopup(){
      this.matdialogRef.close();
  }

}
