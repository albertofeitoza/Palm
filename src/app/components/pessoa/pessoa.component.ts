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
import { Observable, observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  
  pessoa : Pessoa = new Pessoa()
  contato : Contato = new Contato();
  endereco : PessoaEndereco = new PessoaEndereco();
  telefone : Telefone =  new Telefone()
  cep : cep = new cep();

  selected : number = 0;

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
    this.atualizarGrid();
    this.buscarDadosPessoa(this.dialofRef.id);

  }
  
  
  buscarDadosPessoa(id: string) {
    throw new Error('Method not implemented.');
  }
  
  fecharPopup(){
    this.dialofRef.close();
  }

  salvar(){
    if (this.ValidarDados(false) )
    {
      this.dadosPessoa();
      //cadastro da Pessoa
      this.servicoPessoa.create(this.pessoa, Endpoint.Pessoa).subscribe(p => {
        this.dadosContato(p.id)
        //criando Contato
        this.servicoContato.create(this.contato, Endpoint.Contato).subscribe(c => {
          this.cadastrarTelefones(c.id);
        });

        this.endereco.pessoaId = p.id;
        this.servicoEndereco.create(this.endereco, Endpoint.PessoaEndereco ).subscribe(x => {})

        this.fecharPopup();
      })
    }
  }

  dadosPessoa() : void {
    this.pessoa.dtCriacao = new Date;
    this.pessoa.tipoPessoa = TipoPessoa.PessoaFisica;
    let rg = this.pessoa.rg.toString()
    let cpf = this.pessoa.cpfcnpj.toString()
    this.pessoa.rg = rg
    this.pessoa.cpfcnpj = cpf
  }

  dadosContato(id : any) : void {
    
    this.contato.dtCriacao = new Date;
    this.contato.padrao = true;
    this.contato.nome = this.pessoa.nome;
    this.contato.criadoPor = Number(this.servico.Sessao().usuarioId);
    this.contato.bloqueado = false;
    this.contato.pessoaId = id;
    
  }

  adicionarTelefone(){
    
    if(this.ValidarDados(true) && Number(this.telefone.ddd) > 0 && Number(this.telefone.tipoTelefone) > 0 && this.telefone.numTelefone != null )
    {
        let ddd = this.telefone.ddd != null ? this.telefone.ddd.toString() : "";
        let numTeleFone = this.telefone.numTelefone != null ? this.telefone.numTelefone.toString() : "";
        let ramal = this.telefone.ramal != null ? this.telefone.ramal.toString() : ""
        this.telefone.id = this.telefones.length + 1
        this.telefone.dtCriacao = new Date;
        this.telefone.ddd = ddd
        this.telefone.numTelefone = numTeleFone
        this.telefone.ramal = ramal
        this.telefone.tipoTelefone = this.telefone.tipoTelefone > 0 ? this.telefone.tipoTelefone : 1 ;
        this.telefone.bloqueado = false;
        this.telefone.criadoPor = this.servico.Sessao().usuarioId
        this.telefones.push(this.telefone);
        this.atualizarGrid();
        this.telefone = new Telefone()  
    }
    

  }

  cadastrarTelefones(idContato : any){
    this.telefones.forEach(t => {
      t.id = 0;
      t.contatoId = idContato;
      this.servicoTelefone.create(t, Endpoint.Telefone).subscribe(t => {})
      this.servico.showMessage("Pessoa cadastrada ", false)
    });
  }

  atualizarGrid(){
    let newList = this.telefones.slice()
    this.telefones = newList
  }

  RemoveTelefone(item : any){    
    this.telefones.splice(this.telefones.indexOf(item), 1);
    this.atualizarGrid()
  }

  carregaCombos(){
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
    this.tipoTelefone = this.servico.TipoTelefone();
    this.ddd = this.servico.Ddds();
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
      :  this.endereco.cep == null ? this.servico.showMessage("Informar o Cep e pressionar enter", false) 
      :  this.endereco.rua == null ? this.servico.showMessage("Informar a rua", false) 
      :  this.endereco.numero == null ? this.servico.showMessage("Informar o número", false) 
      :  this.endereco.bairro == null ? this.servico.showMessage("Informar o bairro", false) 
      :  this.endereco.siglaEstado == null ? this.servico.showMessage("Informar a sigla do estado", false) 
      :  this.endereco.cidade == null ? this.servico.showMessage("Informar a cidade", false) 
      :  this.telefone.ddd != null && !addTelefone || this.telefone.tipoTelefone != null && !addTelefone || this.telefone.numTelefone != null && !addTelefone ?  this.servico.showMessage("Adicionar o Telefone", false )
      :  this.telefone.ddd == null && addTelefone || Number(this.telefone.ddd) == 0  && addTelefone ?  this.servico.showMessage("Informe o DDD", false )
      :  this.telefone.tipoTelefone == null && addTelefone || Number(this.telefone.tipoTelefone) == 0 && addTelefone ?  this.servico.showMessage("Informe o tipo deTelefone", false )
      :  this.telefone.numTelefone == null && addTelefone ?  this.servico.showMessage("Informe o número do Telefone", false )
      : status =  true;
      return status
  }

  selecionaLinha(id : any){
    this.selected = id
  }

  buscaCep(event : any){
    if(event.which == 13 )
    {
      this.servicoCep.buscarExterna(Endpoint.cep.replace('{0}', this.endereco.cep)).subscribe(ret => {
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