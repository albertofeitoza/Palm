import { TipoUsuarioSistema } from './../../../models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { GrupoUsuario } from './../../../models/usuarios/GrupoUsuarios';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { map, catchError, take, tap, elementAt } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Endpoint } from './../../../Negocio/Endpoint';

import { Usuario } from './../../../models/usuarios/modelLogin';
import { ServiceAllService } from './../../../services/service-all.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { __await } from 'tslib';
import { FooterComponent } from '../../template/footer/footer.component';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})


export class UsuarioReadComponent implements OnInit {

  usuario : Usuario[];
  userAutenticado : boolean = false; 
  
  displayedColumns = ['id','nome','login','empresaId','grupoUsuarioId','bloqueado','action']  
 
  constructor(
              private serviceEmpresa: ServiceAllService<Empresa>,
              private serviceUsuario : ServiceAllService<Usuario>,
              private mensagem : UtilService, 
              private router : Router
             ) 
             { }


  ngOnInit(): void {
     this.getUser();

     let grpId = Number(localStorage.getItem("grpUs"));

  }
  


  navigateToUsuarioCreate(): void{
    let grpId = Number(localStorage.getItem("grpUs"));

    if (grpId == TipoUsuario.Usuario) 
      this.mensagem.showMessage("Você não possui permissão para criação de usuários", true)
    else
      this.router.navigate(['usuarios/create']);
  }

  async getUser() {
      
      let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;
      let empId = localStorage.getItem("empId");
      let grpId = Number(localStorage.getItem("grpUs"));
      let logado = Number(localStorage.getItem("usId"));
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
                    
                    if(usr.empresaId == emp.id.toString().trim())
                    {
                      empresaID = emp.id;
                      usr.empresaId = emp.razaoSocial;
                      usr.grupoUsuarioId = usr.grupoUsuarioId == "1" ? "Administrador" : usr.grupoUsuarioId == "2" ? "Sistema" : usr.grupoUsuarioId == "3" ? "Usuario" : usr.grupoUsuarioId == "4" ? "Master" : usr.grupoUsuarioId;
                      idEmpresa = emp.id;
                      IdEmpresaPai = emp.empresaPai;
                      
                        if(grpId == TipoUsuario.Administrador)
                        {
                          this.usuario.push(usr);
                            break;  
                          }
                          else if(grpId == TipoUsuario.Master)
                          { 
                            if(idEmpresa == empId || IdEmpresaPai == empId && usr.grupoUsuarioId != "Administrador")
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


                



          }
      })
  })
   
  
 }
  

}



