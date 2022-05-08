import { Endpoint } from './../../../Negocio/Endpoint';
import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { ServiceAllService } from './../../../services/service-all.service';
import { Router } from '@angular/router';
import { UtilService } from './../../../services/util.service';
import { Contato } from './../../../models/contato/modelContato';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cnpj } from 'cpf-cnpj-validator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {

 
 empresa: Empresa = new Empresa();

  constructor(private utilService : UtilService,
              private router : Router,
              private servicoEmpresa : ServiceAllService<Empresa>,
              public dialofRef : MatDialogRef<EmpresaCreateComponent>,
   


              )
             { }

  ngOnInit(): void {
   
  }

  cadastrarEmpresa(){
  
    let empPai = Number(this.utilService.Sessao().empresaUsuarioId);
    this.empresa.criadoPor  = Number(this.utilService.Sessao().usuarioId);
    this.empresa.dtCriacao = new Date;
    this.empresa.empresaPai = empPai;
    this.empresa.bloqueado = false;
    
    if(Number(this.utilService.Sessao().idGrupoUsuario) == TipoUsuario.Usuario)
    {
      this.utilService.showMessage("Você não possui permissão para cadastro de empresas", false)
    }
    else
    {
      if(cnpj.isValid(this.empresa.cnpj)){
       this.servicoEmpresa.read(Endpoint.Empresa).subscribe(empc => {
        empc = empc.filter(x => x.cnpj == this.empresa.cnpj)
          
          if (empc.length == 0 ){
            
            if(Number(this.utilService.Sessao().idGrupoUsuario) == TipoUsuario.Administrador){

                this.servicoEmpresa.create(this.empresa, Endpoint.Empresa).subscribe(emp => {
                        
                  let empresaPai = emp;
                         
                              empresaPai = empresaPai;
                              this.servicoEmpresa.update(this.empresa,Endpoint.Empresa).subscribe(() => {})
                         
                          this.utilService.showMessage("Empresa cadastrada com sucesso!",false);
                          
                        })
            }
              else if (Number(this.utilService.Sessao().idGrupoUsuario) == TipoUsuario.Master)
            {
                  
                  this.servicoEmpresa.create(this.empresa, Endpoint.Empresa).subscribe(empe => {
                   let emp = empe;
                          
                    let empresaPai = empe;
                          
                            emp.bloqueado = true;
                            emp.empresaPai = Number(this.utilService.Sessao().empresaUsuarioId);
                            
                            this.servicoEmpresa.update(emp,Endpoint.Empresa).subscribe(() => {})
                       
                            this.utilService.showMessage("Empresa cadastrada com sucesso!",false);

                          })
                }else{
                  this.utilService.showMessage("Para criação de uma empresa precisa está logado com a Matriz.!",false);
                }
          }
          else
           this.utilService.showMessage("Cnpj já cadastrado!",false);
        })  
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
