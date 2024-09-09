import { UtilService } from 'src/app/services/util.service';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Component, OnInit } from '@angular/core';;
import { MatDialogRef } from '@angular/material/dialog';
import { ViewUsuarios } from 'src/app/models/usuarios/modelUsuarios';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})


export class UsuarioReadComponent implements OnInit {

  usuarios: ViewUsuarios[] = new Array()
  displayedColumns = ['id', 'nomeUsuario', 'tipoUsuario', 'ativo', 'action']
  idSelecionado: Number = 0;

  constructor(
    private serviceApi: ServiceAllService<any>,
    public dialofRef: MatDialogRef<UsuarioReadComponent>,
    private serviceUtil: UtilService,
    private auth: LoginService
  ) { }


  ngOnInit(): void {
    this.BuscarUsuarios();
  }

  public CadastrarUsuario(): void {

    this.serviceUtil.Popup("", UsuarioCreateComponent, "45%", '40%')
    .subscribe(res => {
      
      let resultado = res;
    

    
    });
    
  }


  public EditarUsuario(id: number): void {

    
  }
  public BuscarUsuarios(): void {

    let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;

    this.serviceApi.read(Endpoint.Usuarios + `/estabelecimento/${this.dialofRef.id}`)
      .subscribe((result: ViewUsuarios[]) => {
        this.usuarios = filtroUsuario != null ? result.filter(x => x.nomeUsuario.toLowerCase().includes(filtroUsuario.toLowerCase())) : result
      })
  }

  selecionaLinha(id: Number) {
    this.idSelecionado = id;
  }
}



