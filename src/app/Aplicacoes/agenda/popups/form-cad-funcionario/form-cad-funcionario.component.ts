import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/Agenda/modelAgenda';
import { GrupoAgenda } from 'src/app/models/Agenda/modelGrupoAgenda';
import { Empresa } from 'src/app/models/empresa/ModelEmpresa';
import { Sala } from 'src/app/models/Sala/SalaModel';
import { Unidade } from 'src/app/models/Unidade/unidadeModel';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-form-cad-funcionario',
  templateUrl: './form-cad-funcionario.component.html',
  styleUrls: ['./form-cad-funcionario.component.css']
})
export class FormCadFuncionarioComponent implements OnInit {

  agenda : Agenda;
  comboProfissional  : Usuario[];
  comboUnidade : Unidade[];
  comboSala : Sala[];
  comboTipoGrupoAgenda : GrupoAgenda[];
  empresa : Empresa[];

  constructor(
    public dialogRef: MatDialogRef<FormCadFuncionarioComponent>,
    private route : Router,
              private _serviceEmpresa : ServiceAllService<Empresa>,
              private _serviceAgenda : ServiceAllService<Agenda>,
              private _service_usuario : ServiceAllService<Usuario>,
              private _serviceUnidade : ServiceAllService<Unidade>,
              private _serviceSala : ServiceAllService<Sala>,
              private _serviceGrupoAgenda : ServiceAllService<GrupoAgenda>,
              private _utilService : UtilService
              
              ) { }

  ngOnInit(): void {
    this.carregaCombos()
  }


  carregaCombos(){
    //let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;
    let empId = localStorage.getItem("empId");
    let grpId = Number(localStorage.getItem("grpUs"));
    //let logado = Number(localStorage.getItem("usId"));
     
      this.carregaComboEmpresa(grpId, empId );
      this.carregaComboUnidade(grpId, empId);
      this.carregaComboSala(grpId, empId);
      this.carregaComboGrupoAgenda(grpId, empId);
  }

  carregaComboEmpresa(grpId: number , empId: string ){
   
    this._serviceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    });

    this._service_usuario.read(Endpoint.Usuario).subscribe(pro => {
      pro = pro;       
       
    if (grpId == TipoUsuario.Administrador)
        this.comboProfissional = pro; 
    else if (grpId == TipoUsuario.Master)  
        this.comboProfissional = pro.filter(x => x.empresaid.toString() == empId);
    });

  }

  carregaComboUnidade(grpId: number , empId: string){
    this._serviceUnidade.read(Endpoint.Unidade).subscribe(un => {
      un = un;
    if (grpId == TipoUsuario.Administrador)
      this.comboUnidade = un; 
    else if (grpId == TipoUsuario.Master)  
      this.comboUnidade = un.filter(x => x.empresaid.toString() == empId);
    });
  }

  carregaComboSala(grpId: number , empId: string){
    this._serviceSala.read(Endpoint.Sala).subscribe(sl => {
      sl = sl; 
    if (grpId == TipoUsuario.Administrador)
      this.comboSala = sl; 
    else if (grpId == TipoUsuario.Master)  
      this.comboSala = sl.filter(x => x.empresaid .toString() == empId);
    });
  }

  carregaComboGrupoAgenda(grpId: number , empId: string){
    this._serviceGrupoAgenda.read(Endpoint.GrupoAgenda).subscribe(ga => {
      ga = ga;
    
    if (grpId == TipoUsuario.Administrador)
      this.comboTipoGrupoAgenda = ga; 
    else if (grpId == TipoUsuario.Master)  
      this.comboTipoGrupoAgenda = ga.filter(x => x.empresaid .toString() == empId);

    });
  }


  createAgenda(): void{

  }


  fecharPopup(): void {
    this.dialogRef.close();
  }


}
