import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SolucoesEmpresa, ViewPermissaoUsuariosSolucao } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { ViewUsuarios } from 'src/app/models/usuarios/modelUsuarios';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-permissao-usuario-solucao',
  templateUrl: './permissao-usuario-solucao.component.html',
  styleUrls: ['./permissao-usuario-solucao.component.css']
})
export class PermissaoUsuarioSolucaoComponent implements OnInit {

  displayedColumns = ['id', 'nome', 'action']

  dadosRequest: SolucoesEmpresa = new SolucoesEmpresa();
  viewUsuarios: ViewUsuarios[] = new Array();
  idUsuario = 0;
  permissaoUsuarios: ViewPermissaoUsuariosSolucao[] = new Array()

  constructor(
    private dialogRef: MatDialogRef<PermissaoUsuarioSolucaoComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.dadosRequest = this.dialogRef._containerInstance._config.data.object;
    this.BuscarUsuariosPermitidos();
  }

  private CarregaCombos(): void {
    this.serviceApi.read(Endpoint.Usuarios + `/estabelecimento/${this.dadosRequest.empresaId}`)
      .subscribe((result: ViewUsuarios[]) => {
        this.viewUsuarios = new Array();

        result.forEach(us => {
          if (this.permissaoUsuarios.filter(u => u.usuarioId === us.id).length === 0)
            this.viewUsuarios.push(us);
        });

      })
  }

  private BuscarUsuariosPermitidos(): void {
    this.serviceApi.read(Endpoint.PermissaoUsuarioSolucao + `/estabelecimento/${this.dadosRequest.empresaId}/${this.dadosRequest.id}`)
      .subscribe((result: ViewPermissaoUsuariosSolucao[]) => {
        this.permissaoUsuarios = result;

        this.CarregaCombos();

      });
  }


  public fecharPopup(): void {
    this.dialogRef.close();
  }

  public CadastrarPermissaoUsuario(): void {

    if (this.idUsuario === 0)
      return this.servico.showMessage("Selecione o usuário para cadastro", true);

    const request = {
      id: 0,
      nome: '',
      usuarioId: this.idUsuario,
      solucaoEmpresaId: this.dadosRequest.id,
      empresaId: this.dadosRequest.empresaId,
      ativo: true
    }
    this.serviceApi.create(request, Endpoint.PermissaoUsuarioSolucao)
      .subscribe(() => {
        this.BuscarUsuariosPermitidos()
      })

  }

  public ExcluirPermissao(id: any): void {

    this.serviceApi.create(id, Endpoint.PermissaoUsuarioSolucao + `/excluir/${id}`)
      .subscribe(() => {
        this.BuscarUsuariosPermitidos();
      })
  }

}
