import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewPessoa } from 'src/app/models/Pessoa/ViewPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { LoginService } from 'src/app/services/login.service';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { PessoaCreateComponent } from '../modal/pessoa-create/pessoa-create.component';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';

@Component({
  selector: 'app-pessoa-read',
  templateUrl: './pessoa-read.component.html',
  styleUrls: ['./pessoa-read.component.css']
})
export class PessoaReadComponent implements OnInit {
  displayedColumns = ['id', 'nome', 'rg', 'cpf', 'dataNascimento', 'excluido', 'action']

  pessoas: ViewPessoa[] = new Array();
  idSelecionado = 0;

  constructor(
    private dialofRef: MatDialogRef<PessoaReadComponent>,
    private serviceApi: ServiceAllService<any>,
    private auth: LoginService,
    private serviceUtil: UtilService
  ) {
  }

  ngOnInit(): void {

    this.BuscarPessoas('')
  }

  public BuscarPessoas(filtro: any): void {

    this.serviceApi.read(Endpoint.Pessoa + `/estabelecimento/${this.dialofRef.id}`)
      .subscribe((result: ViewPessoa[]) => {
        this.pessoas = filtro != null ? result.filter(x => x.nome.toLowerCase().includes(filtro)) : result
      })

  }

  public CadastrarPessoa(): void {
    const dados = {
      acao: 'cadastro',
      idEmpresa : this.dialofRef.id
    }
    this.serviceUtil.Popup('', PessoaCreateComponent, '40%', 'auto',false, dados)
      .subscribe(() => {
        this.BuscarPessoas('');
      })
  }


  public EditarPessoa(idPessoa: number): void {
    const dados = {
      acao: 'atualizar',
      idPessoa : idPessoa
    }

    this.serviceUtil.Popup('', PessoaCreateComponent, '40%', 'auto',false, dados )
    .subscribe(() => {
      this.BuscarPessoas('');
    })

  }

  public selecionaLinha(id: number): void {

  }


  SelecionarPessoa(event: any) {

    if (event.which == 1 || event.which == 13) {
      let filtro = (<HTMLSelectElement>document.getElementById('buscartexto')).value
      this.BuscarPessoas(filtro);
      (<HTMLSelectElement>document.getElementById('buscartexto')).value = '';
    }
  }
}
