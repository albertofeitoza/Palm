import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { UtilService } from './../../../services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { ServiceAllService } from './../../../services/service-all.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/modelLogin';

@Component({
  selector: 'app-empresa-delete',
  templateUrl: './empresa-delete.component.html',
  styleUrls: ['./empresa-delete.component.css']
})
export class EmpresaDeleteComponent implements OnInit {


  empresa : Empresa
  constructor(private serviceEmpresa : ServiceAllService<Empresa>,
              private serviceUsuario : ServiceAllService<Usuario>,
              private router : Router,
              private route : ActivatedRoute,
              private mensagem : UtilService

            ) { }

  ngOnInit(): void {
    this.BuscarEmpresa();
  }


  excluirEmpresa(){
    
    let existeUsuario = null;
    
    this.serviceUsuario.read(Endpoint.Usuario).subscribe(usr => {
        usr = usr;
        existeUsuario = usr.filter(x => x.empresaId == this.empresa.id.toString())
       
        if (existeUsuario.length > 0)
        {
          this.mensagem.showMessage("Empresa não pode ser excluida porque possui Dependências de usuários.", false)
        }    
        else{
            let grpId = Number(localStorage.getItem("grpUs"));
          
            if (grpId == TipoUsuario.Administrador){
        
              this.serviceEmpresa.delete(this.empresa.id, Endpoint.Empresa).subscribe(()=>{
                this.mensagem.showMessage("Empresa excluida com sucesso !", false);
                this.router.navigate(['/empresa'])
              })
            }
              else{
                this.mensagem.showMessage("Permissão de exclusão negada !", false);
                this.router.navigate(['/empresa'])
              }
        }
    });
  }

  cancel(){
    this.router.navigate(['/empresa'])
  }

   BuscarEmpresa(){
    const id = this.route.snapshot.paramMap.get('id');
    
    this.serviceEmpresa.readById(id, Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;

    })

   }


}
