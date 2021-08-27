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
import { cnpj } from 'cpf-cnpj-validator';
import { MatDialogRef } from '@angular/material/dialog';

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
              private servicoEmpresa : ServiceAllService<Empresa>,
              public dialofRef : MatDialogRef<EmpresaCreateComponent>,
   


              )
             { }

  ngOnInit(): void {
   
  }

  cadastrarEmpresa(){
    
    let grpId = Number(this.utilService.Sessao().GrupoUsuario);
    let empPai = Number(this.utilService.Sessao().IdEmpresa);
    this.empresa.criadoPor  = Number(this.utilService.Sessao().UsuarioId);
    this.empresa.dtCriacao = new Date;
    this.empresa.empresaPai = empPai;
       
    this.empresa.bloqueado = false;
    
    if(grpId == TipoUsuario.Usuario)
    {
      this.utilService.showMessage("Você não possui permissão para cadastro de empresas", false)

    }else
    {
     if(cnpj.isValid(this.empresa.cnpj)){
       this.servicoEmpresa.read(Endpoint.Empresa).subscribe(bemp => {
          bemp = bemp;
         let retornoEmp = bemp.filter(x => x.cnpj == this.empresa.cnpj)
         let retornomaster = bemp.filter(x => x.id == empPai);

          if (retornoEmp.length == 0 ){
            
            if(grpId == TipoUsuario.Administrador){

                this.servicoEmpresa.create(this.empresa, Endpoint.Empresa).subscribe(emp => {
                  emp = emp;
                        
                  let empresaPai = emp.id;
                         
                              emp.empresaPai = empresaPai;
                              this.servicoEmpresa.update(emp,Endpoint.Empresa).subscribe(() => {})
                         
                          this.utilService.showMessage("Empresa cadastrada com sucesso!",false);
                          this.utilService.atualizaRota("empresa");
                          this.empresa = null;
                        })
                }else if (grpId == TipoUsuario.Master && retornomaster.filter(x => x.empresaPai == empPai).length > 0)
                {
                  
                  this.servicoEmpresa.create(this.empresa, Endpoint.Empresa).subscribe(emp => {
                    emp = emp;
                          
                    let empresaPai = emp.id;
                          
                              emp.bloqueado = true;
                              emp.empresaPai = Number(localStorage.getItem("empId"));
                              this.servicoEmpresa.update(emp,Endpoint.Empresa).subscribe(() => {})
                       
                            this.utilService.showMessage("Empresa cadastrada com sucesso!",false);
                            this.utilService.atualizaRota("empresa");
                            this.empresa = null;
                          })
                }else{
                  this.utilService.showMessage("Para criação de uma empresa precisa está logado com a Matriz.!",false);
                }
          }
          else
           this.utilService.showMessage("Cnpj já cadastrado!",false);
        });  
      }
      else{
        this.utilService.showMessage("Cnpj inválido",false);
      }
    }
  }

  fecharPopup(){
    this.dialofRef.close()
  }

}
