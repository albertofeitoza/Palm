import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { PessoaGrid } from 'src/app/models/Pessoa/modelPessoaGrid';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaCreateComponent } from 'src/app/components/pessoa/modal/pessoa-create/pessoa-create.component';
import { ViewPessoa } from 'src/app/models/Pessoa/ViewPessoa';

@Component({
  selector: 'app-agendamentos-create',
  templateUrl: './agendamentos-create.component.html',
  styleUrls: ['./agendamentos-create.component.css']

})
export class AgendamentosCreateComponent implements OnInit {

  colunas = ['id', 'nome', 'protocolos', 'grupoAgenda', 'agendamentoFuturo', 'responsavel', 'ura', 'cpf', 'rg', 'telefone', 'celular', 'action']

  pessoa: Pessoa = new Pessoa();
  // pessoas: PessoaGrid[] = new Array();
  idSelecionado: Number = 0;
  sexo: any[]
  estCivil: any[]


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pessoas = new MatTableDataSource<PessoaGrid>();



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
    this.BuscarPessoas();
  }

  agendamentosFuturo(id: any) {
    alert("Pessoa" + id)
  }

  public BuscarPessoas(): void {
    this.idSelecionado = 0;


    this.serviceApi.read(Endpoint.Pessoa + `/viewPersonalizada/${this.servico.Sessao().EmpresaId}`)
      .subscribe((p : PessoaGrid[]) => {
        this.pessoas.data = p.filter(x =>
          // this.pessoa.nome != null &&
          //   this.pessoa.responsavel != null &&
          //   this.pessoa.rg != null &&
          //   this.pessoa.cpf != null
          //   ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
          //   && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
          //   && x.rg?.includes(this.pessoa.rg)
          //   && x.cpf?.includes(this.pessoa.cpf)

          //   : this.pessoa.nome != null &&
          //     this.pessoa.responsavel != null &&
          //     this.pessoa.rg != null
          //     ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
          //     && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
          //     && x.rg?.includes(this.pessoa.rg)

          //     : this.pessoa.nome != null &&
          //       this.pessoa.responsavel != null
          //       ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())
          //       && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())

          //       : this.pessoa.responsavel != null &&
          //         this.pessoa.rg != null &&
          //         this.pessoa.cpf != null
          //         ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
          //         && x.rg?.includes(this.pessoa.rg)
          //         && x.cpf?.includes(this.pessoa.cpf)

          //         : this.pessoa.rg != null &&
          //           this.pessoa.cpf != null
          //           ? x.rg?.includes(this.pessoa.rg)
          //           && x.cpf?.includes(this.pessoa.cpf)

                     this.pessoa.nome != null
                      ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())

                      : this.pessoa.responsavel != null
                        ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())

                        : this.pessoa.rg != null
                          ? x.rg?.includes(this.pessoa.rg)

                          : this.pessoa.cpf != null
                            ? x.cpf?.includes(this.pessoa.cpf)

                            : p)

        this.pessoas.paginator = this.paginator
        this.pessoas.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Itens por página";

      });
  }

  bucarAgendamentos() {


  }

  fecharPopup() {

    this.dialofRef.close()

  }

  AgendarOrcar() {

    if (this.idSelecionado) {
      this.servico.Popup('', DadosAgendamentoComponent, '75%', '80%', true, this.idSelecionado)
        .subscribe(result => {
          if (result)
            this.dialofRef.close();
        });
    }


  }

  LinhaSelecionada(id: Number) {
    if (this.idSelecionado == id)
      this.idSelecionado = 0
    else
      this.idSelecionado = id;
  }

  public CadastrarPessoa(): void {
    const dados = {
      acao: 'cadastro',
      idEmpresa: this.servico.Sessao().EmpresaId
    }
    this.servico.Popup('', PessoaCreateComponent, '40%', 'auto', false, dados)
      .subscribe(() => {
        this.BuscarPessoas();
      })
  }

  EditarPessoa(id: Number) {
    // this.servico.Popup(id.toString(), PessoaUpdateComponent, '70%', '80%')
  }


}