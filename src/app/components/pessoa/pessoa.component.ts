import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { cpf } from 'cpf-cnpj-validator';
import { TipoPessoa } from 'src/app/Negocio/TipoPessoa';
import { Contato } from 'src/app/models/contato/modelContato';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { cep } from 'src/app/models/CEP/modelBuscaCep';
import { PessoaEndereco } from 'src/app/models/Pessoa/modelPessoaEndereco';
import { map, Observable, observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  
  pessoa : Pessoa = new Pessoa() 
  contato : Contato = new Contato()

  endereco : PessoaEndereco = new PessoaEndereco();
  telefone : Telefone =  new Telefone()
  cep : cep = new cep();
  selected : number = 0;
  enableComponent : boolean = false

  sexo : any[];
  estCivil : any[];
  tipoTelefone : any[]
  ddd : any[]

  telefones : Telefone[] = new Array()
  
  displayedColumns = ['ddd', 'numTelefone','ramal','observacao','tipoTelefone','action']  
  
  constructor(
              private servico : UtilService,
              private dialofRef : MatDialogRef<PessoaComponent>,
              private servicoPessoa : ServiceAllService<Pessoa>,
              private servicoContato : ServiceAllService<Contato>,
              private servicoTelefone : ServiceAllService<Telefone>,
              private servicoCep : ServiceAllService<cep>,
              private servicoEndereco : ServiceAllService<PessoaEndereco>
              )
               { }

  ngOnInit(): void {
    this.carregaCombos()
  }
  
  fecharPopup(){
    this.dialofRef.close();
  }

  async salvar() {
    if (this.ValidarDados(false) )
    {
      var idPessoa = 0;
      this.pessoa.dtCriacao = new Date;
      this.pessoa.tipoPessoa = TipoPessoa.PessoaFisica;
      let rg = this.pessoa.rg == null ? "" : this.pessoa.rg.toString()
      let cpf = this.pessoa.cpfcnpj.toString()
      this.pessoa.rg = rg
      this.pessoa.cpfcnpj = cpf
        this.contato.dtCriacao = new Date;
        this.contato.nome = this.pessoa.nome,
        this.contato.padrao = true
        this.contato.pessoaId = this.pessoa.id
        this.contato.email = this.contato.email
        this.contato.email_secundario = this.contato.email_secundario
        this.contato.bloqueado = false;
        this.pessoa.contato = this.contato
        
      await this.servicoPessoa.create(this.pessoa, Endpoint.Pessoa).subscribe(x => {
            this.pessoa = x;
            this.contato = x.contato
            this.enableComponent = true
      })
    }
  }
  


  
  CadastrarEndereços(idPessoa : any) : Observable<PessoaEndereco> {
    this.endereco.id = 0;
        this.endereco.pessoaId = idPessoa;
        this.endereco.dtCriacao = new Date;
        this.endereco.numero.toString();
        this.endereco.cep
        this.endereco.criadoPor = Number(this.servico.Sessao().usuarioId);
        return this.servicoEndereco.create(this.endereco, Endpoint.PessoaEndereco )
  
  
      }

  carregaCombos(){
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
  }

  ValidarDados(addTelefone : Boolean) : Boolean {
    let status = false;
      this.pessoa.nome == null 
      ? this.servico.showMessage("Informar o Nome", false)  
      :  this.pessoa.cpfcnpj == null ? this.servico.showMessage("Informar o CPF", false) 
      :  !cpf.isValid(this.pessoa.cpfcnpj.toString()) ? this.servico.showMessage("Cpf Inválido", false)
      :  this.pessoa.cpfcnpj.toString().length > 11 ? this.servico.showMessage("Apenas pessoa física é permitido", false)
      :  this.pessoa.dataNascimento == null ? this.servico.showMessage("Informar o data de nascimento", false) 
      :  this.pessoa.estCivil == null ? this.servico.showMessage("estado cívil Obrigatório", false) 
      :  this.pessoa.sexo == null ? this.servico.showMessage("informar o sexo", false) 
      // :  this.endereco.cep == null ? this.servico.showMessage("Informar o Cep e pressionar enter", false) 
      // :  this.endereco.rua == null ? this.servico.showMessage("Informar a rua", false) 
      // :  this.endereco.numero == null ? this.servico.showMessage("Informar o número", false) 
      // :  this.endereco.bairro == null ? this.servico.showMessage("Informar o bairro", false) 
      // :  this.endereco.siglaEstado == null ? this.servico.showMessage("Informar a sigla do estado", false) 
      // :  this.endereco.cidade == null ? this.servico.showMessage("Informar a cidade", false) 
      : status =  true;
      return status
  }

  selecionaLinha(id : any){
    this.selected = id
  }

  buscaCep(event : any){
    if(event.which == 13 )
    {
      this.servicoCep.buscarExterna(Endpoint.cep.replace('{0}', this.endereco.cep.toString())).subscribe(ret => {
          if(ret.logradouro != null)
          {
            this.endereco.rua = ret.logradouro
            this.endereco.bairro = ret.bairro
            this.endereco.cidade = ret.localidade
            this.endereco.siglaEstado = ret.uf
          }
          else{
            this.servico.showMessage("Não foi possível encontrar o CEP informado", false) 
          }
      });
    }
  }
}