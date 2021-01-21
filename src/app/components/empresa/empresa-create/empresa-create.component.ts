import { Endpoint } from './../../../Negocio/Endpoint';
import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../../services/service-all.service';
import { Router } from '@angular/router';
import { UtilService } from './../../../services/util.service';
import { Contato } from './../../../models/contato/modelContato';
import { ContatoService } from './../../../services/contato.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {

 
empresa : Empresa = {
    dtCriacao : null,
    cnpj: null,
    razaoSocial: null,
    nomeFantasia: null,
    inscricaoEstadual: null,
    inscricaoMunicipal: null,
    cnes : null,
    codPIS : null,
    observacao : null,
    codCnae : null,
    empresaPai : null,
    criadoPor : null,
    bloqueado : null
    
}



  constructor(private utilService : UtilService,
              private router : Router,
              private servicoEmpresa : ServiceAllService<Empresa>
              )
             { }

  ngOnInit(): void {
   
  }

  cadastrarEmpresa(){
    
    let grpId = Number(localStorage.getItem("grpUs"));
    
    this.empresa.criadoPor  = Number(localStorage.getItem("usId"));
    this.empresa.dtCriacao = new Date;
    this.empresa.empresaPai = Number(localStorage.getItem("empId"))
    this.empresa.bloqueado = false;

    this.servicoEmpresa.create(this.empresa, Endpoint.Empresa).subscribe(emp => {
      emp = emp;
      let empresaPai = emp.id;

      if(grpId == TipoUsuario.Administrador)
      {
          emp.empresaPai = empresaPai;
          this.servicoEmpresa.update(emp,Endpoint.Empresa).subscribe(() => {})
      }
      this.utilService.showMessage("Empresa cadastrada com sucesso!",false);
      this.router.navigate(['empresa']);
    })
  
  }

  cancel(){
    this.router.navigate(['empresa'])
  }

}
