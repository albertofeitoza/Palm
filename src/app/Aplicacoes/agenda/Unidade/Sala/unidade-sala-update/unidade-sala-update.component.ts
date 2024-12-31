import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-unidade-sala-update',
  templateUrl: './unidade-sala-update.component.html',
  styleUrls: ['./unidade-sala-update.component.css']
})
export class UnidadeSalaUpdateComponent implements OnInit {

  sala: Sala = new Sala();

  constructor(
    public dialog: MatDialogRef<UnidadeSalaUpdateComponent>,
    private servico: UtilService,
    private servicoSala: ServiceAllService<Sala>
  ) { }

  ngOnInit(): void {
    this.buscarSala()
  }


  buscarSala() {
    this.servicoSala.readById(this.dialog.id, Endpoint.Sala)
      .subscribe((result: Sala) => {
        this.sala = result;
      })
  }

  alterarSala() {

    this.servicoSala.create(this.sala, Endpoint.Sala)
      .subscribe(() => {
        this.servico.showMessage("Sala alterada com sucesso!", false);
        this.buscarSala();
      })


  }

  fecharPopup() {
    this.dialog.close()
  }

}
