import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-unidade-sala-cadastro',
  templateUrl: './unidade-sala-cadastro.component.html',
  styleUrls: ['./unidade-sala-cadastro.component.css']
})
export class UnidadeSalaCadastroComponent implements OnInit {


listasala : Sala[]

sala : Sala = new Sala()

  constructor(
              private servicoSala : ServiceAllService<Sala>,
              private servico : UtilService,
              public dialog : MatDialogRef<UnidadeSalaCadastroComponent>

  ) { }

  ngOnInit(): void {
      this.buscaSala()
    

  }

  addSala(){

    // this.sala.unidadeid= Number(this.dialog.id);
    // this.sala.dtCriacao = new Date;
    // this.sala.criadoPor = this.servico.Sessao().usuarioId;

    // this.servicoSala.create(this.sala, Endpoint.Sala).subscribe(() => {
    //   this.servico.showMessage("Sala Cadastrada com sucesso", false);
    // })


  }

  fecharPopup(){
      this.dialog.close()
  }

  buscaSala(){

        this.servicoSala.read(Endpoint.Sala).subscribe(sl => {
          this.listasala = sl
        })

  }

}
