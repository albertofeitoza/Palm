import { Component, OnInit, Output,Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-agenda-alterar-unidade',
  templateUrl: './agenda-alterar-unidade.component.html',
  styleUrls: ['./agenda-alterar-unidade.component.css']
})
export class AgendaAlterarUnidadeComponent implements OnInit {

  unidade : Unidade

  constructor(
              public dialog : MatDialogRef<AgendaAlterarUnidadeComponent>,
              private servicoUnidade : ServiceAllService<Unidade>,
              private servico : UtilService,

              ) { }




  ngOnInit(): void {
      this.buscarUnidade();
  }

  buscarUnidade(){
    this.servicoUnidade.readById(this.dialog.id, Endpoint.Unidade).subscribe(un => {
      this.unidade = un;
    })
  }


  editarUnidade(){

      this.servicoUnidade.update(this.unidade, Endpoint.Unidade).subscribe(() => {
        this.servico.showMessage("Unidade alterada com sucesso!", false)
        this.fecharPopup();

        
      })
  }

  fecharPopup(){
      this.dialog.close()
      this.dialog.componentInstance
  }


}
