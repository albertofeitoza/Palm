import { LoginService } from 'src/app/services/login.service';
import * as core from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { cep } from 'src/app/models/CEP/modelBuscaCep';
import { Contato } from 'src/app/models/contato/modelContato';
import { PessoaEndereco } from 'src/app/models/Pessoa/modelPessoaEndereco';
import { Pessoa } from 'src/app/models/Pessoa/Pessoa';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { TipoPessoa } from 'src/app/Negocio/TipoPessoa';

import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { ViewPessoa } from 'src/app/models/Pessoa/ViewPessoa';

@core.Component({
  selector: 'app-pessoa-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.css'],

})
export class PessoaCreateComponent implements core.OnInit {
  pessoa: Pessoa = new Pessoa()

  contato: Contato = new Contato()
  endereco: PessoaEndereco = new PessoaEndereco();
  telefone: Telefone = new Telefone()
  cep: cep = new cep();
  selected: number = 0;
  enableComponent: boolean = false

  sexo: any[];
  estCivil: any[];
  tipoTelefone: any[]
  ddd: any[]

  telefones: Telefone[] = new Array()

  displayedColumns = ['ddd', 'numTelefone', 'ramal', 'observacao', 'tipoTelefone', 'action']

  dados: any;


  constructor(
    private servico: UtilService,
    private dialofRef: MatDialogRef<PessoaCreateComponent>,
    private serviceApi: ServiceAllService<any>,
    private auth: LoginService

  ) { }

  ngOnInit(): void {
    this.carregaCombos()
    this.pessoa.estCivil = 0;
    this.pessoa.tipoSexo = 0;
    this.dados = this.dialofRef._containerInstance._config.data.object;
    if (this.dados.acao === 'atualizar')
      this.BuscarPessoas();


  }

  public BuscarPessoas(): void {

    if (this.dialofRef._containerInstance._config.data.object.idPessoa > 0) {
      this.serviceApi.readById(this.dialofRef._containerInstance._config.data.object.idPessoa, Endpoint.Pessoa)
        .subscribe((result: Pessoa) => {
          this.pessoa = result;
        })
    }
  }


  fecharPopup() {
    this.dialofRef.close();
  }

  public Salvar(): void {

    if (this.ValidarDados()) {

      this.serviceApi.readById("", Endpoint.Pessoa + `/buscarporcpf/${this.pessoa.cpf}/${this.dados.acao === 'cadastro' ? this.dados.idEmpresa : this.pessoa.empresaId}`)
        .subscribe((result: ViewPessoa) => {

          if (this.dados.acao === 'cadastro') {

            if (result && result.id === 0) {
              this.pessoa.id = 0;
              this.pessoa.dtCriacao = new Date;
              this.pessoa.rg = this.pessoa.rg.toString();
              this.pessoa.tipoPessoa = TipoPessoa.PessoaFisica;
              this.pessoa.cpf = this.pessoa.cpf.toString();
              this.pessoa.empresaId = Number(this.dados.idEmpresa);

              this.serviceApi.create(this.pessoa, Endpoint.Pessoa)
                .subscribe((result: Pessoa) => {
                  this.servico.showMessage(`Cadastro realizado com sucesso!.`, false)
                  this.dialofRef.close(result)
                })
            } else {
              this.servico.showMessage(`O Cpf Informado já se encontra cadastrado para a pessoa ${result.nome}`, true)
              return;
            }
          }

          if (this.dados.acao === 'atualizar') {
            this.pessoa.rg = this.pessoa.rg.toString();
            this.pessoa.cpf = this.pessoa.cpf.toString();
            this.serviceApi.create(this.pessoa, Endpoint.Pessoa)

              .subscribe((result: Pessoa) => {
                this.servico.showMessage(`Dados atualizado com sucesso!.`, false)
                this.dialofRef.close(result)
              })

          }
        })
    }
  }




  CadastrarEndereços(idPessoa: any) {
    // this.endereco.id = 0;
    //     this.endereco.pessoaId = idPessoa;
    //     this.endereco.dtCriacao = new Date;
    //     this.endereco.numero.toString();
    //     this.endereco.cep
    //     this.endereco.criadoPor = Number(this.servico.Sessao().usuarioId);
    //     return this.servicoEndereco.create(this.endereco, Endpoint.PessoaEndereco )


  }

  carregaCombos() {
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
  }

  ValidarDados(): Boolean {
    let status = false;
    !this.pessoa.nome
      ? this.servico.showMessage("Informar o Nome", true)
      : this.pessoa.cpf == null ? this.servico.showMessage("Informar o CPF", true)
        : !cpf.isValid(this.pessoa.cpf.toString()) ? this.servico.showMessage("Cpf Inválido", true)
          : this.pessoa.dataNascimento == null ? this.servico.showMessage("Informar o data de nascimento", true)
            : this.pessoa.estCivil == undefined || this.pessoa.estCivil < 1 ? this.servico.showMessage("Estado cívil Obrigatório", true)
              : this.pessoa.tipoSexo == undefined || this.pessoa.tipoSexo < 1 ? this.servico.showMessage("informar o sexo", true)
                : status = true

    return status;
  }

  selecionaLinha(id: any) {
    this.selected = id
  }

  buscaCep(event: any) {
    if (event.which == 13) {
      this.serviceApi.buscarExterna(Endpoint.cep.replace('{0}', this.endereco.cep.toString())).subscribe(ret => {
        if (ret.logradouro != null) {
          this.endereco.rua = ret.logradouro
          this.endereco.bairro = ret.bairro
          this.endereco.cidade = ret.localidade
          this.endereco.siglaEstado = ret.uf
        }
        else {
          this.servico.showMessage("Não foi possível encontrar o CEP informado", false)
        }
      });
    }
  }

}
