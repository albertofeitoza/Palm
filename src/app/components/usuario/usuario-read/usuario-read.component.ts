import { UtilService } from './../../../services/util.service';
import { Router } from '@angular/router';
import { Endpoint } from './../../../Negocio/Endpoint';
import { Usuario } from './../../../models/usuarios/modelLogin';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';;
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { Overlay } from '@angular/cdk/overlay';
import { UsuarioUpdateComponent } from '../usuario-update/usuario-update.component';
import { UsuarioDeleteComponent } from '../usuario-delete/usuario-delete.component';
import { viewModelUsuarios } from 'src/app/models/usuarios/modelUsuarios';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})


export class UsuarioReadComponent implements OnInit {

  usuario : viewModelUsuarios[]
  userAutenticado : boolean = false; 
  
  displayedColumns = ['id','nome','login','grupoUsuarioid','bloqueado','action']  
 
  constructor(
              public dialog : MatDialog,
              public overlay : Overlay,
              private serviceEmpresa: ServiceAllService<Empresa>,
              private serviceUsuario : ServiceAllService<viewModelUsuarios>,
              private _utilService : UtilService, 
              private router : Router,

             ) 
             { }


  ngOnInit(): void {
     if(this._utilService.Sessao() != undefined)
      this.userAutenticado = true

      this.getUser();
  }
  
  addUsuario(): void{
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(UsuarioCreateComponent, {
          width : '700px',
          height : '820px',
          scrollStrategy

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de usuários",true);
    }
  }


  editarUsuario(id : string): void{
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(UsuarioUpdateComponent, {
          width : '700px',
          height : '670px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de usuários",true);
    }
  }


  deletarUsuario(id : string): void{
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(UsuarioDeleteComponent, {
          width : '500px',
          height : '260px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de usuários",true);
    }
  }

  async getUser() {
      
      let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;

      this.serviceUsuario.read(Endpoint.Usuario).subscribe(u =>{
         this.usuario = filtroUsuario != null ? u.filter(x => x.nome.toLowerCase().includes(filtroUsuario.toLowerCase())) : u
      })
  }
      
}



