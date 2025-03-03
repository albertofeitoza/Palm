import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { endWith } from 'rxjs/operators';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-excluir-unidade',
  templateUrl: './agenda-excluir-unidade.component.html',
  styleUrls: ['./agenda-excluir-unidade.component.css']
})
export class AgendaExcluirUnidadeComponent implements OnInit {


  unidade: any

  constructor(
    public dialog: MatDialogRef<AgendaExcluirUnidadeComponent>,
    private servicoUnidade: ServiceAllService<Unidade>,
    private servico: UtilService
  ) { }

  ngOnInit(): void {
    this.buscarUnidade();
  }

  buscarUnidade() {
    this.servicoUnidade.readById(this.dialog.id, Endpoint.Unidade).subscribe(un => {
      this.unidade = un;
    })
  }

  ExcluirUnidade() {

    this.servicoUnidade.create(this.unidade.id, Endpoint.Unidade + `/excluir/${this.unidade.id}`)
      .subscribe(() => {
        this.servico.showMessage("Unidade Excluída com sucesso!", false);
        this.servico.atualizaRota("agenda", true)
        this.fecharPopup();
      })
  }


  fecharPopup() {
    this.dialog.close();
  }

}
