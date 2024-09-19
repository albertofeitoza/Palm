import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { PessoaGrid } from 'src/app/models/Pessoa/modelPessoaGrid';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';

@Component({
  selector: 'app-agendamentos-create',
  templateUrl: './agendamentos-create.component.html',
  styleUrls: ['./agendamentos-create.component.css']

})
export class AgendamentosCreateComponent implements OnInit {

  colunas = ['id', 'nome', 'protocolos', 'grupoAgenda', 'agendamentoFuturo', 'responsavel', 'ura', 'cpf', 'rg', 'telefone', 'celular', 'action']

  pessoa: Pessoa = new Pessoa();
  pessoas: PessoaGrid[] = new Array();
  idSelecionado: Number = 0;
  sexo: any[]
  estCivil: any[]


  constructor(
    private dialofRef: MatDialogRef<AgendamentosCreateComponent>,
    private serviceApi: ServiceAllService<any>,
    private servicoCadastroPessoa: ServiceAllService<Pessoa>,
    private servico: UtilService

  ) { }

  ngOnInit(): void {
    this.sexo = this.servico.Genero();
    this.estCivil = this.servico.EstCivil();
    this.BuscarPessoas()

  }

  NovoAgendamento() {
    alert("Teste de cadastro");
  }

  buscarProtocolo(id: any) {
    alert("pessoa" + id);
  }

  agendamentosFuturo(id: any) {
    alert("Pessoa" + id)
  }

  public BuscarPessoas(): void {
    this.idSelecionado = 0;
    

    this.serviceApi.read(Endpoint.Pessoa + `/estabelecimento/${this.servico.Sessao().EmpresaId}`)
      .subscribe(p => {
        this.pessoas = p.filter(x =>
          this.pessoa.nome != null &&
            this.pessoa.responsavel != null &&
            this.pessoa.rg != null &&
            this.pessoa.cpf != null
            ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
            && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
            && x.rg?.includes(this.pessoa.rg)
            && x.cpf?.includes(this.pessoa.cpf)

            : this.pessoa.nome != null &&
              this.pessoa.responsavel != null &&
              this.pessoa.rg != null
              ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
              && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
              && x.rg?.includes(this.pessoa.rg)

              : this.pessoa.nome != null &&
                this.pessoa.responsavel != null
                ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
                && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())

                : this.pessoa.responsavel != null &&
                  this.pessoa.rg != null &&
                  this.pessoa.cpf != null
                  ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
                  && x.rg?.includes(this.pessoa.rg)
                  && x.cpf?.includes(this.pessoa.cpf)

                  : this.pessoa.rg != null &&
                    this.pessoa.cpf != null
                    ? x.rg?.includes(this.pessoa.rg)
                    && x.cpf?.includes(this.pessoa.cpf)

                    : this.pessoa.nome != null
                      ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())

                      : this.pessoa.responsavel != null
                        ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())

                        : this.pessoa.rg != null
                          ? x.rg?.includes(this.pessoa.rg)

                          : this.pessoa.cpf != null
                            ? x.cpf?.includes(this.pessoa.cpf)

                            : p)
      });
  }

  bucarAgendamentos() {


  }

  fecharPopup() {

    this.dialofRef.close()

  }

  AgendarOrcar() {
    if (this.idSelecionado)
      this.servico.Popup(this.idSelecionado.toString(), DadosAgendamentoComponent, '75%', '80%', true)
    .subscribe(result => {

      let retorno = result;


    });

  }

  LinhaSelecionada(id: Number) {
    if (this.idSelecionado == id)
      this.idSelecionado = 0
    else
      this.idSelecionado = id;
  }

  CadastrarPessoa() {
    //  this.servico.Popup("", PessoaComponent, '70%', '80%')
  }

  EditarPessoa(id: Number) {

    // this.servico.Popup(id.toString(), PessoaUpdateComponent, '70%', '80%')

  }


}