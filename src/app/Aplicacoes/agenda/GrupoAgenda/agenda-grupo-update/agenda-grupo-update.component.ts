import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-grupo-update',
  templateUrl: './agenda-grupo-update.component.html',
  styleUrls: ['./agenda-grupo-update.component.css']
})
export class AgendaGrupoUpdateComponent implements OnInit {

  grupo: GrupoAgenda = new GrupoAgenda();

  constructor(
    public dialogRef: MatDialogRef<AgendaGrupoUpdateComponent>,
    private servico: UtilService,
    private servicoGrupo: ServiceAllService<GrupoAgenda>
  ) { }

  ngOnInit(): void {
    this.buscarGrupo()
  }

  buscarGrupo() {
    this.servicoGrupo.readById(this.dialogRef.id, Endpoint.GrupoAgenda)
      .subscribe(x => {
        this.grupo = x;
      })
  }

  editarGrupo() {
    this.servicoGrupo.create(this.grupo, Endpoint.GrupoAgenda)
      .subscribe(() => {
        this.servico.showMessage("Grupo Alterado com sucesso", false)
        this.fecharPopup();
      });

  }

  fecharPopup() {
    this.dialogRef.close()
  }

}
