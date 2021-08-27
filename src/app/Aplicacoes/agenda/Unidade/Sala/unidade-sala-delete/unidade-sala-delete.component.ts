import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-unidade-sala-delete',
  templateUrl: './unidade-sala-delete.component.html',
  styleUrls: ['./unidade-sala-delete.component.css']
})
export class UnidadeSalaDeleteComponent implements OnInit {

  sala : Sala

  constructor(
                public dialog : MatDialogRef <UnidadeSalaDeleteComponent>, 
                private servico : UtilService, 
                private servicoSala : ServiceAllService<Sala>
              ) { }

  ngOnInit(): void {
      this.buscarSala()
  }

  buscarSala(){
    this.servicoSala.readById(this.dialog.id, Endpoint.Sala).subscribe(x => {
        this.sala = x;
    })
  }

  excluirSala(){
    this.servicoSala.delete(this.sala.id, Endpoint.Sala).subscribe(x => {
      this.servico.showMessage("Sala excluída com sucesso", false);
      this.fecharPopup()
    })
  }

  fecharPopup(){
    this.dialog.close()
  }
  
}
