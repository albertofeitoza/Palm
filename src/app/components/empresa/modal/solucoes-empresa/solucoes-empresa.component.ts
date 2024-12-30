import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { PermissaoUsuarioSolucaoComponent } from '../permissao-usuario-solucao/permissao-usuario-solucao.component';

@Component({
  selector: 'app-solucoes-empresa',
  templateUrl: './solucoes-empresa.component.html',
  styleUrls: ['./solucoes-empresa.component.css']
})
export class SolucoesEmpresaComponent implements OnInit {

  solucoesEmpresa: SolucoesEmpresa[] = new Array();

  displayedColumns = ['solucaoNome', 'ativo', 'action']
  idSelecionado = 0;
  idEmpresa = 0;

  constructor(
    private dialogRef: MatDialogRef<SolucoesEmpresaComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>

  ) {

  }

  ngOnInit(): void {
    this.idEmpresa = Number(this.dialogRef.id);
    this.BuscarSolucoesEmpresa();
  }

  private BuscarSolucoesEmpresa(): void {

    this.serviceApi.read(Endpoint.SolucoesEmpresa + `/estabelecimento/${this.idEmpresa}/${0}`)
      .subscribe((result: SolucoesEmpresa[]) => {
        this.solucoesEmpresa = result;
      });
  }

  selecionaLinha(id: number) { }

  public PermissaoUsuarios(row: SolucoesEmpresa): void {
   this.servico.Popup('', PermissaoUsuarioSolucaoComponent, '25%', '70%', false, row)
    .subscribe(result => {
       result = [...result]
    });
  }
}
