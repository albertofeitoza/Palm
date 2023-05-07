import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { PessoaUpdateComponent } from 'src/app/components/pessoa/pessoa-update/pessoa-update.component';
import { PessoaComponent } from 'src/app/components/pessoa/pessoa.component';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { map } from 'rxjs';

@Component({
  selector: 'app-dados-agendamento',
  templateUrl: './dados-agendamento.component.html',
  styleUrls: ['./dados-agendamento.component.css']
})
export class DadosAgendamentoComponent implements OnInit {
  
  protocolo : Protocolo = new Protocolo()
  agendamento : Agendamentos = new Agendamentos();
  
  idPessoa : Number
  idTelefoneRes : Number
  idTelefoneCel : Number
  idContato : Number

  constructor(
              private dialofRef : MatDialogRef<DadosAgendamentoComponent>,
              private servicoProtocolo : ServiceAllService<Protocolo>,
              private servicePessoa : ServiceAllService<Pessoa>,
              private serviceTelefone : ServiceAllService<Telefone>,
              private servico : UtilService
             ) { }

  ngOnInit(): void {
    this.buscaPessoa();
    this.criarProtocolo()  
  
  }
  
  criarProtocolo(){
   
    this.protocolo.dtCriacao = new Date;
    this.protocolo.tipo = 0;
    this.protocolo.criadoPor = this.servico.Sessao().usuarioId;
    this.protocolo.descricao = "Agendamento";
    this.protocolo.empresaid = this.servico.Sessao().empresaUsuarioId;
    this.protocolo.pessoaid = Number(this.dialofRef.id)
    
   
    this.servicoProtocolo.create(this.protocolo, Endpoint.Protocolo).subscribe(x => {
      this.protocolo = x;
    })

  }

  buscaPessoa(){
    this.servicePessoa.readById(this.dialofRef.id, Endpoint.Pessoa).subscribe(ret => {
      this.agendamento.nome = ret.nome;
      this.agendamento.responsavel = ret.responsavel;
      this.agendamento.rg = ret.rg;
      this.agendamento.cpf = ret.cpfcnpj;
      this.agendamento.dataNascimento = ret.dataNascimento;
      this.agendamento.email = ret.contato.email

      this.serviceTelefone.read(Endpoint.Telefone).subscribe(tel => {

        let telefones  = tel.filter(x => x.contatoId == ret.contato.id);
        
        this.idPessoa = ret.id;
        this.idContato =  ret.contato.id
        this.idTelefoneRes = telefones!= null && telefones.filter(x => x.tipoTelefone == "1") ? Number(telefones.filter(x => x.tipoTelefone =="1").map(x => Number(x.id))) : 0;
        this.idTelefoneCel = telefones!= null && telefones.filter(x => x.tipoTelefone == "2") ? Number(telefones.filter(x => x.tipoTelefone =="2").map(x => Number(x.id))) : 0;
        
        this.agendamento.telefone = telefones!= null && telefones.filter(x => x.tipoTelefone == "1") ? Number(telefones.filter(x => x.tipoTelefone =="1").map(x => x.numTelefone)) : 0;
        this.agendamento.celular = telefones!= null && telefones.filter(x => x.tipoTelefone == "2") ? Number(telefones.filter(x => x.tipoTelefone =="2").map(x => x.numTelefone)) : 0;
      });
    })
  }
  
  fecharPopup(){
    this.dialofRef.close()


  }

  AtualizarDados(){
      //this.servico.Popup(this.pessoa.id.toString(), PessoaUpdateComponent, '70%' , '80%')
   alert('Telefone residencial' + this.agendamento.telefone)
   alert('Telefone residencial' + this.agendamento.celular)
  }


}
