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


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})


export class UsuarioReadComponent implements OnInit {

  usuario : any
  userAutenticado : boolean = false; 
  
  displayedColumns = ['id','nome','login','empresaid','grupoUsuarioid','bloqueado','action']  
 
  constructor(
              public dialog : MatDialog,
              public overlay : Overlay,
              private serviceEmpresa: ServiceAllService<Empresa>,
              private serviceUsuario : ServiceAllService<Usuario>,
              private _utilService : UtilService, 
              private router : Router,

             ) 
             { }


  ngOnInit(): void {
     this.getUser();
  }
  


  addUsuario(): void{
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador)
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
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador)
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
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador)
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

      let empId = this._utilService.Sessao().empresaUsuarioId;
      let grpId = Number(this._utilService.Sessao().idGrupoUsuario);
      let logado =  Number(this._utilService.Sessao().usuarioId);
      this.userAutenticado = grpId == TipoUsuario.Usuario ? false : true;
  
      this.serviceUsuario.read(Endpoint.Usuario).subscribe(u =>{
        u = u;
        let responseUsuarios = u;

        let usuarioFIltrados = new Array();
         
        if (filtroUsuario){
           
          for (let index = 0; index < responseUsuarios.length; index++) {
            const element = responseUsuarios[index];
              if (element.nome.toLowerCase().includes(filtroUsuario.toLowerCase()))
                usuarioFIltrados.push(element);
          }
          responseUsuarios = new Array();
          responseUsuarios = usuarioFIltrados;    
        }

        this.serviceEmpresa.read(Endpoint.Empresa).subscribe(e => {
          e = e;     
          let responseEmpresa = e;

          this.usuario = new Array();
          let empresaID = null;
          let idEmpresa = null;
          let IdEmpresaPai = null;

          for (let index = 0; index < responseUsuarios.length; index++) {
            const usr = responseUsuarios[index];
            
                  for (let index = 0; index <  responseEmpresa.length; index++) {
                    const emp =  responseEmpresa[index];
                    
                   
                    
                      empresaID = emp.id;
                      usr.empresaid = emp.razaoSocial;
                      usr.grupoUsuarioid = usr.grupoUsuarioid == localStorage.getItem("grpUsGrpAdm") ? "Administrador"
                                         : usr.grupoUsuarioid == localStorage.getItem("grpUsGrpsis") ? "Sistema" 
                                         : usr.grupoUsuarioid == localStorage.getItem("grpUsGrpUs") ? "Usuario" 
                                         : usr.grupoUsuarioid == localStorage.getItem("grpUsGrpMs") ? "Master" 
                                         : usr.grupoUsuarioid;

                      idEmpresa = emp.id;
                      IdEmpresaPai = emp.empresaPai;
                      
                        if(grpId == TipoUsuario.Administrador)
                        {
                          this.usuario.push(usr);
                            break;  
                          }
                          else if(grpId == TipoUsuario.Master)
                          { 
                            if(idEmpresa == empId || IdEmpresaPai == empId && usr.grupoUsuarioid != "Administrador")
                            {
                              this.usuario.push(usr);
                              empresaID = null;
                              idEmpresa = null;
                              break;
                            }
                          }
                          else if(grpId == TipoUsuario.Usuario)
                          { 
                            
                            if(idEmpresa == empId && usr.id == logado)
                            {
                              this.usuario.push(usr);
                              empresaID = null;
                              idEmpresa = null;
                              break;
                            }
                            
                          }

                        
                  }
          }
      })
  })
   
  
 }
  

}



