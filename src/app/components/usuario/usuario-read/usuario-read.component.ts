import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Component, OnInit } from '@angular/core';;
import { MatDialogRef } from '@angular/material/dialog';
import { ViewUsuarios } from 'src/app/models/usuarios/modelUsuarios';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})


export class UsuarioReadComponent implements OnInit {

  usuarios: ViewUsuarios[] = new Array()
  userAutenticado: boolean = false;
  displayedColumns = ['id', 'nomeUsuario', 'tipoUsuario', 'ativo', 'action']
  idSelecionado: Number = 0;

  constructor(
    private serviceApi: ServiceAllService<any>,
    public dialofRef: MatDialogRef<UsuarioReadComponent>,
  ) { }


  ngOnInit(): void {
    this.BuscarUsuarios();
  }

  addUsuario(): void {

    // if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.MasterEmpresa.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    // {
    //     const scrollStrategy = this.overlay.scrollStrategies.reposition();
    //     const dialogRef = this.dialog.open(UsuarioCreateComponent, {
    //       width : '700px',
    //       height : '820px',
    //       scrollStrategy

    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log(`Dialog result: ${result}`);
    //     });
    // }else{
    //   this._utilService.showMessage("Você não possui permissão para criação de usuários",true);
    // }
  }


  public EditarUsuario(id: number): void {

    // if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.MasterEmpresa.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    // {
    //     const scrollStrategy = this.overlay.scrollStrategies.reposition();
    //     const dialogRef = this.dialog.open(UsuarioUpdateComponent, {
    //       width : '700px',
    //       height : '670px',
    //       scrollStrategy,
    //       id

    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log(`Dialog result: ${result}`);
    //     });
    // }else{
    //   this._utilService.showMessage("Você não possui permissão para criação de usuários",true);
    // }
  }
  public BuscarUsuarios(): void {

    let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;

    this.serviceApi.read(Endpoint.Usuarios + `/estabelecimento/${this.dialofRef.id}`)
      .subscribe((result: ViewUsuarios[]) => {
        this.usuarios = filtroUsuario != null ? result.filter(x => x.nomeUsuario.toLowerCase().includes(filtroUsuario.toLowerCase())) : result
      })
  }

  selecionaLinha(id: Number) {
    this.idSelecionado = id;
  }
}



