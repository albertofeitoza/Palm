import { UtilService } from './../../../services/util.service';
import { Observable } from 'rxjs';
import { EmpresaService } from './../../../services/empresa.service';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/modelLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  empresa : Observable<Empresa[]>;
  dadosEmpresa : Empresa;
  usuario : Usuario = new Usuario();

  constructor(private usarioService : UsuarioService,
             private empresaService : EmpresaService,
             private utilService: UtilService,
             private router : Router,
             private route: ActivatedRoute
             ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.usarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.senha = '*****';
      this.usuario.passwordTemp = '';

      this.buscarEmpresa();
    });

  }

  updateUsuario(): void {
    this.usarioService.update(this.usuario).subscribe(() => {
      this.utilService.showMessage("Usuário Atualizado com Sucesso!")
      this.router.navigate(['/usuarios'])
    })

  }


  cancel(): void{
    this.router.navigate(['/usuarios'])
  }

  buscarEmpresa() {
    this.empresa = this.empresaService.read();
  }

}
