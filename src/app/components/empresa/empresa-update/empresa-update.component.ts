import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Usuario } from './../../../models/usuarios/modelLogin';
import { UtilService } from './../../../services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { cnpj } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css']
})
export class EmpresaUpdateComponent implements OnInit {

  empresa : Empresa;
  usuariologado : boolean;
  constructor(private router : Router,
              private route: ActivatedRoute,
              private empresaService : ServiceAllService<Empresa>,
              private mensagem : UtilService
              ) { }

  ngOnInit(): void {
  
  if (Number(localStorage.getItem("grpUs")) == TipoUsuario.Administrador)
     this.usuariologado = true;
  
  this.ObterEmpresa();
  
  }


  atualizarEmpresa() : void {
    
    let grpId = Number(localStorage.getItem("grpUs"));
    if(grpId == TipoUsuario.Usuario)
    {
      this.mensagem.showMessage("Você não possui permissão para editar o cadastro de empresas", false)

    }else
    {
     if (cnpj.isValid(this.empresa.cnpj)){
               try {
                        this.empresaService.update(this.empresa, Endpoint.Empresa).subscribe(()=>{
                        this.mensagem.showMessage("Empresa atualizada com sucesso", false)
                        this.router.navigate(['/empresa'])
                      });

                    } catch (error) {
                      this.mensagem.showMessage("Erro na atualização dos dados " + error, true);
                    }

      }else{
        this.mensagem.showMessage("Cnpj Inválido " , false);
      }
      }
  }

  cancel(){
    this.router.navigate(['/empresa'])
  }

  
  ObterEmpresa() {
    const id = this.route.snapshot.paramMap.get('id')
    this.empresaService.readById(id, Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })    
       
  }
  

}


