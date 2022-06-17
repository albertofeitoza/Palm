import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { cpf } from 'cpf-cnpj-validator';
import { TipoPessoa } from 'src/app/Negocio/TipoPessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  [x: string]: any;

  pessoa : Pessoa = new Pessoa()
  sexo : any[];
  estCivil : any[];
  constructor(
              private servico : UtilService,
              private dialofRef : MatDialogRef<PessoaComponent>,
              private servicoPessoa : ServiceAllService<Pessoa>,
              )
               { }

  ngOnInit(): void {
    this.carregaCombos()
  
  }
  
  fecharPopup(){
    this.dialofRef.close();
  }

  salvar(){
     
    if (this.ValidarDados())
    {
      this.pessoa.dtCriacao = new Date;
      this.pessoa.tipoPessoa = TipoPessoa.PessoaFisica;
      let rg = this.pessoa.rg.toString()
      let cpf = this.pessoa.cpfcnpj.toString()
      this.pessoa.rg = rg
      this.pessoa.cpfcnpj = cpf
      
      this.servicoPessoa.create(this.pessoa, Endpoint.Pessoa).subscribe(p => {
          p = p;
          this.servico.showMessage("Cadastro efetuado com sucesso", false)
          this.fecharPopup();
        })
    }
  }

  carregaCombos(){
    this.sexo = this.servico.Genero()
    this.estCivil = this.servico.EstCivil();
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

}
