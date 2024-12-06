import { Solucoes } from 'src/app/models/Solucoes/Solucoes';
import { Empresa } from '../../../../models/empresa/ModelEmpresa';
import { Endpoint } from '../../../../Negocio/Endpoint';
import { ServiceAllService } from '../../../../services/service-all.service';
import { UtilService } from '../../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-solucoes-create',
  templateUrl: './solucoes-create.component.html',
  styleUrls: ['./solucoes-create.component.css']
})
export class SolucoesCreateComponent implements OnInit {

  solucao: Solucoes = new Solucoes();

  constructor(
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>,
    private dialofRef: MatDialogRef<SolucoesCreateComponent>,
  ) { }


  ngOnInit(): void {
    let id = this.dialofRef.id
    this.BuscarSolucao();
  }

  private BuscarSolucao(): void {
    
    this.serviceApi.readById(this.dialofRef.id, Endpoint.Solucoes)
      .subscribe((result: Solucoes) => {
        this.solucao = result;
      })
  }

  public Salvar(): void {
    
    if(this.solucao && this.solucao.id === 0){
      this.serviceApi.create(this.solucao, Endpoint.Solucoes)
      .subscribe(() => {
        this.dialofRef.close(true)
      })
    } else {
      this.serviceApi.update(this.solucao, Endpoint.Solucoes)
      .subscribe(() => {
        this.dialofRef.close(true)
      })
    }
  }

  public FecharPopup(): void {
    this.dialofRef.close();
  }}
