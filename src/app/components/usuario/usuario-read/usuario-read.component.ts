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
    this.BuscarUsuarios('');
  }

  public CadastrarUsuario(): void {

    const dados = {
      acao: 'idEmpresa',
      id: this.dialofRef.id
    }

    this.serviceUtil.Popup('', UsuarioCreateComponent, "35%", '55%', false, dados)
      .subscribe(() => {
        this.BuscarUsuarios('');
      });
  }
  public EditarUsuario(id: number): void {

    const dados = {
      acao: 'idIsuario',
      id: id
    }
    this.serviceUtil.Popup('', UsuarioCreateComponent, "35%", '60%', false, dados)
      .subscribe(() => {
        this.BuscarUsuarios('');
      });

  }


  public BuscarUsuarios(event: any): void {
    
    // let filtroUsuario = (<HTMLSelectElement>document.getElementById('busca')).value;

    let filtro = (<HTMLSelectElement>document.getElementById('buscartexto')).value
    
    if (event.which === 13 || event.which ===  1)
    {
      this.serviceApi.read(Endpoint.Usuarios + `/estabelecimento/${this.dialofRef.id}`)
      .subscribe((result: ViewUsuarios[]) => {
        this.usuarios = filtro != null ? result.filter(x => x.nomeUsuario.toLowerCase().includes(filtro.toLowerCase())) : result
      })

    } else {
      this.serviceApi.read(Endpoint.Usuarios + `/estabelecimento/${this.dialofRef.id}`)
      .subscribe((result: ViewUsuarios[]) => {
        this.usuarios = result
      })
    }
   
  }

  selecionaLinha(id: Number) {
    this.idSelecionado = id;
  }
}



