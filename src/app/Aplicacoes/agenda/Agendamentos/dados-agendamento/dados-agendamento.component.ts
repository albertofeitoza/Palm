import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Protocolo } from 'src/app/models/Protocolo/modelProtocolo';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { PessoaUpdateComponent } from 'src/app/components/pessoa/pessoa-update/pessoa-update.component';
import { PessoaComponent } from 'src/app/components/pessoa/pessoa.component';

@Component({
  selector: 'app-dados-agendamento',
  templateUrl: './dados-agendamento.component.html',
  styleUrls: ['./dados-agendamento.component.css']
})
export class DadosAgendamentoComponent implements OnInit {
  
  protocolo : Protocolo = new Protocolo()
  pessoa : Pessoa = new Pessoa()


  constructor(
              private dialofRef : MatDialogRef<DadosAgendamentoComponent>,
              private servicoProtocolo : ServiceAllService<Protocolo>,
              private servicePessoa : ServiceAllService<Pessoa>,
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
      this.servico.showMessage(`Protocolo Gerado com Sucesso ${x.id }, informar ao cliente.`)
    })

  }

  buscaPessoa(){
    this.servicePessoa.readById(this.dialofRef.id, Endpoint.Pessoa).subscribe(x => {
      this.pessoa = x;
    })
  }
  


  fecharPopup(){
    this.dialofRef.close()
  }

  editarPessoa(){
      this.servico.Popup(this.pessoa.id.toString(), PessoaComponent, '70%' , '80%')
   
  }


}
