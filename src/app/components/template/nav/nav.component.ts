import { TipoUsuario } from './../../../models/usuarios/enumUsuarios';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { UsuarioCreateComponent } from '../../usuario/usuario-create/usuario-create.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  opened = true;
  unlockadm = false;
  unlockMaster = false;
  width = 0


  constructor(
    private auth: LoginService,
    private servico: UtilService,

  ) { }

  ngOnInit(): void {
    this.validarAcesso();
    this.width = 200
  }

  sairSistema() {

    this.auth.sairSistema();

  }
  validarAcesso() {

    if (this.auth.dadosUsuario.TipoUsuarioLogado === 1) {
      this.unlockadm = true;
    }

    if (this.auth.dadosUsuario.TipoUsuarioLogado === 2) {
      this.unlockMaster = true;
    }

  }
}
