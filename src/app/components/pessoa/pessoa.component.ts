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

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  
  pessoa : Pessoa = new Pessoa()
  contato : Contato = new Contato();
  telefone : Telefone =  new Telefone()
  cep : cep = new cep();

  sexo : any[];
  estCivil : any[];
  tipoTelefone : any[]
  ddd : any[]
  retornocep : cep[]

  displayedColumns = ['DDD', 'email','email_Secundario','website','observacao','padrao','action']  
  
  telefones : Telefone[] = new Array()

  constructor(
              private servico : UtilService,
              private dialofRef : MatDialogRef<PessoaComponent>,
              private servicoPessoa : ServiceAllService<Pessoa>,
              private servicoCep : ServiceAllService<cep>
              
              )
               { }

  ngOnInit(): void {
    this.carregaCombos()
    this.buscaCep(13)
  }
  
  fecharPopup(){
    this.dialofRef.close();
  }

  salvar(){
    if (this.ValidarDados() )
    {
      this.dadosPessoa();
     
      this.servicoPessoa.create(this.pessoa, Endpoint.Pessoa).subscribe(p => {
          p = p;
          this.servico.showMessage("Pessoa cadastrada ", false)

          //criando o contato
         

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

    //if (!this.validaContatos()) 
         this.dadosContato();

  
  }

  dadosContato() : void {
    
    this.contato.dtCriacao = new Date;
    this.contato.padrao = true;
    this.contato.nome = this.pessoa.nome;
    this.contato.criadoPor = Number(this.servico.Sessao().usuarioId);
    this.contato.pessoaId = 0;
    this.contato.bloqueado = false;
    
  }

  adicionarTelefone(){
    
    if(this.ValidarDados())
    {
      //if (!this.validaContatos()) this.dadosContato() 
                
        let ddd = this.telefone.ddd != null ? this.telefone.ddd.toString() : "";
        let numTeleFone = this.telefone.numTeleFone != null ? this.telefone.numTeleFone.toString() : "";
        let ramal = this.telefone.ramal != null ? this.telefone.ramal.toString() : ""
        this.telefone.dtCriacao = new Date;
        this.telefone.ddd = ddd
        this.telefone.numTeleFone = numTeleFone
        this.telefone.ramal = ramal
        this.telefone.tipoTelefone = this.telefone.tipoTelefone > 0 ? this.telefone.tipoTelefone : 1 ;
        this.telefone.bloqueado = false;
        this.telefones.push(this.telefone);
    
    }
  }

  carregaCombos(){
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
    this.tipoTelefone = this.servico.TipoTelefone();
    this.ddd = this.servico.Ddds();
  }

  ValidarDados() : Boolean {

    let status = false;
      this.pessoa.nome == null 
      ? this.servico.showMessage("Informar o Nome", false)  
      :  this.pessoa.cpfcnpj == null ? this.servico.showMessage("Informar o CPF", false) 
      :  !cpf.isValid(this.pessoa.cpfcnpj.toString()) ? this.servico.showMessage("Cpf Inválido", false)
      :  this.pessoa.dataNascimento == null ? this.servico.showMessage("Informar o data de nascimento", false) 
      :  this.pessoa.estCivil == null ? this.servico.showMessage("estado cívil Obrigatório", false) 
      :  this.pessoa.sexo == null ? this.servico.showMessage("informar o sexo", false) 
      : status = true;

      return status;
  }

  telefonesNaoAdicionados() :  boolean {

    if (this.telefone.ddd != null || this.telefone.numTeleFone != null || this.telefone.tipoTelefone != null )
      return true
      return false

  }

  buscaCep(event : any){

    if(event == 13)
    {
        let cep = '09790705'
        this.servicoCep.buscarExterna(Endpoint.cep.replace('{0}', cep)).subscribe(x => {
          this.retornocep = x;
        })
    }

  }
  

}

