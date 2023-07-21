import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { PessoaGrid } from 'src/app/models/Pessoa/modelPessoaGrid';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';
import { cpf } from 'cpf-cnpj-validator';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PessoaComponent } from 'src/app/components/pessoa/pessoa.component';
import { PessoaUpdateComponent } from 'src/app/components/pessoa/pessoa-update/pessoa-update.component';

@Component({
  selector: 'app-agendamentos-create',
  templateUrl: './agendamentos-create.component.html',
  styleUrls: ['./agendamentos-create.component.css']
  
})
export class AgendamentosCreateComponent implements OnInit {

 colunas = ['id','nome','protocolos','grupoAgenda','agendamentoFuturo','responsavel','ura','cpf','rg','telefone','celular','action'] 
 
 pessoa: Pessoa = new Pessoa();
 pessoaGrid: PessoaGrid[];
 idSelecionado : Number = 0;
 sexo : any[]
 estCivil: any[]
 

constructor(
              private dialofRef : MatDialogRef<AgendamentosCreateComponent>,
              private servicoPessoa : ServiceAllService<PessoaGrid>,
              private servicoCadastroPessoa : ServiceAllService<Pessoa>,
              private servico : UtilService
    
              ) { }

  ngOnInit(): void {
  

    this.sexo = this.servico.Genero();
    this.estCivil = this.servico.EstCivil();
  
  }
  
  NovoAgendamento(){
      alert("Teste de cadastro");
  }

  buscarProtocolo(id : any){
    alert("pessoa" + id);
  }

  agendamentosFuturo(id : any){
    alert("Pessoa" + id )
  }

  buscarPessoa(){
    this.idSelecionado = 0;
    this.pessoaGrid = new Array()
 
    this.servicoPessoa.read(Endpoint.Pessoa).subscribe(p => {
    this.pessoaGrid = p.filter(x => 
                                    this.pessoa.nome != null && 
                                    this.pessoa.responsavel != null && 
                                    this.pessoa.rg != null && 
                                    this.pessoa.cpfcnpj != null
                                  ?  x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase()) 
                                  && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
                                  && x.rg?.includes(this.pessoa.rg)
                                  && x.cpf?.includes(this.pessoa.cpfcnpj)
                                  
                                  : this.pessoa.nome != null && 
                                    this.pessoa.responsavel != null && 
                                    this.pessoa.rg != null 
                                  ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase()) 
                                  && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
                                  && x.rg?.includes(this.pessoa.rg) 
                                  
                                  : this.pessoa.nome != null && 
                                    this.pessoa.responsavel != null 
                                  ?  x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase()) 
                                  && x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase()) 

                                  : this.pessoa.responsavel != null && 
                                    this.pessoa.rg != null && 
                                    this.pessoa.cpfcnpj != null
                                  ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
                                  && x.rg?.includes(this.pessoa.rg)
                                  && x.cpf?.includes(this.pessoa.cpfcnpj)

                                  : this.pessoa.rg != null && 
                                  this.pessoa.cpfcnpj != null
                                  ? x.rg?.includes(this.pessoa.rg)
                                  && x.cpf?.includes(this.pessoa.cpfcnpj)
                                  
                                  : this.pessoa.nome != null
                                  ? x.nome?.toLowerCase().includes(this.pessoa.nome.toLowerCase())

                                  : this.pessoa.responsavel != null
                                  ? x.responsavel?.toLowerCase().includes(this.pessoa.responsavel.toLowerCase())
                                  
                                  : this.pessoa.rg != null
                                  ? x.rg?.includes(this.pessoa.rg)

                                  : this.pessoa.cpfcnpj != null
                                  ? x.cpf?.includes(this.pessoa.cpfcnpj)
                                  
                                  :p)
    });
  }

  bucarAgendamentos(){
    
 
  }

  fecharPopup(){
      
      this.dialofRef.close()

  }

  AgendarOrcar(){
    if(this.idSelecionado)
       this.servico.Popup(this.idSelecionado.toString(), DadosAgendamentoComponent, '75%', '80%')
  
  }

  LinhaSelecionada(id : Number){
    if(this.idSelecionado == id)
      this.idSelecionado = 0
    else    
      this.idSelecionado = id;
  }
  
  CadastrarPessoa(){
   this.servico.Popup("", PessoaComponent, '70%', '80%')
  }

  EditarPessoa(id : Number){
  
    this.servico.Popup(id.toString(), PessoaUpdateComponent, '70%', '80%')
  
  }


}