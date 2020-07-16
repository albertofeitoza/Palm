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

  usuario : Usuario = {
    nome: null,
    email: null,
    telefone: null,
    login : null,
    senha : null,
    empresaId : null,
    loginTemp : null,
    passwordTemp : null
  
  }

  constructor(private usarioService : UsuarioService,
             private router : Router,
             private route: ActivatedRoute
             ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.usarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario;
    });

  }

  updateUsuario(): void {
    this.usarioService.update(this.usuario).subscribe(() => {
      this.usarioService.showMessage("Usuário Atualizado com Sucesso!")
      this.router.navigate(['/usuarios'])
    })

  }


  cancel(): void{
    this.router.navigate(['/usuarios'])
  }


}
