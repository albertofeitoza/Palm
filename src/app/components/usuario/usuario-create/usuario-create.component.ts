import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { LoginService } from 'src/app/services/login.service';
import { ServiceAllService } from './../../../services/service-all.service';
import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewPessoa } from 'src/app/models/Pessoa/ViewPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ViewUsuarios } from 'src/app/models/usuarios/modelUsuarios';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  tipoLogin: boolean = false;
  empresa: Empresa[];
  tipoUsuario: any[]

  dadosEmpresa: Empresa;
  usuario: Usuario = new Usuario();
  pessoas: ViewPessoa[] = new Array();
  dados: any;
  constructor(private serviceApi: ServiceAllService<any>,
    private utilService: UtilService,
    private auth: LoginService,
    public dialogRef: MatDialogRef<UsuarioCreateComponent>,

    private router: Router) { }

  ngOnInit(): void {
    this.dados = this.dialogRef._containerInstance._config.data.object;
    this.carregaCombos();
    this.carregaEmpresa();

    if (this.dados.acao === 'idIsuario')
      this.BuscarUsuario(this.dados)

  }

  public Salvar(): void {

    if (this.usuario.id === 0) {

      this.usuario.empresaId = this.dados.id;
      this.usuario.ativo = true;

      this.serviceApi.readById(this.dialogRef.id, Endpoint.Usuarios + `/estabelecimento/${this.dados.id}`)
        .subscribe((result: ViewUsuarios[]) => {

          if (result.filter(x => x.empresaId === Number(this.dados.id) && x.nomeUsuario.toLocaleLowerCase().trim() === this.usuario.nomeUsuario.toLocaleLowerCase().trim()).length > 0) {
            this.utilService.showMessage(`Já existe um usuário na empresa com esse nome`, true);
            return;
          }

          if (result.filter(x => x.pessoaId === this.usuario.pessoaId
            && x.empresaId === Number(this.dados.id)
            && x.tipoUsuario === this.usuario.tipoUsuario).length === 0) {

            this.serviceApi.create(this.usuario, Endpoint.Usuarios)
              .subscribe(() => {
                this.utilService.showMessage("Usuário cadastrado com sucesso!", false);
                this.fecharPopup();
              })

          } else {
            let response = result.filter(x => x.pessoaId === this.usuario.pessoaId && x.empresaId === Number(this.dados.id) && x.tipoUsuario === this.usuario.tipoUsuario).map(x => x.nomeUsuario);
            this.utilService.showMessage(`Já existe um usuário para essa pessoa com esse perfil, Usuario : ${response}`, true);
            return;

          }

        })
    } else {
      this.serviceApi.create(this.usuario, Endpoint.Usuarios)
        .subscribe(() => {
          this.utilService.showMessage("Usuário alterado com sucesso!", false);
          this.fecharPopup();
        })

    }
  }

  private BuscarUsuario(dados: any): void {
    this.serviceApi.readById(dados.id, Endpoint.Usuarios)
      .subscribe((result: Usuario) => {
        this.usuario = result;

        this.serviceApi.read(Endpoint.Pessoa + `/estabelecimento/${result.empresaId}`)
          .subscribe((resultPessoa: ViewPessoa[]) => {
            this.pessoas.push(resultPessoa.filter(x => x.id == result.pessoaId)[0]);
          })
      })
  }

  public fecharPopup(): void {
    this.dialogRef.close();
  }


  private carregaCombos(): void {
    if (this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.Administrador) {
      this.tipoUsuario = this.utilService.TipoUsuario();
    }

    if (this.auth.dadosUsuario.TipoUsuarioLogado == TipoUsuario.MasterEmpresa) {
      this.tipoUsuario = this.utilService.TipoUsuario().filter(x => x.id > 1);
    }

    this.BuscarPessoas(this.dialogRef.id);

  }

  carregaEmpresa(): void {

  }

  private BuscarPessoas(filtro: any): void {

    this.serviceApi.read(Endpoint.Pessoa + `/estabelecimento/${this.dados.id}`)
      .subscribe((result: ViewPessoa[]) => {
        this.pessoas = filtro != null ? result.filter(x => x.nome.toLowerCase().includes(filtro) && !x.excluido) : result
      })

  }

}
