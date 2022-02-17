import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Usuario } from 'src/app/models/usuarios/modelLogin';

@Component({
  selector: 'app-agendamentos-create',
  templateUrl: './agendamentos-create.component.html',
  styleUrls: ['./agendamentos-create.component.css']
  
})
export class AgendamentosCreateComponent implements OnInit {

  colunas = ['id','nome','Protocoloid','tipoAgendamento','futuro','responsavel','atendimento','ura','cpf','rg','telefone','celular','statusAgendamento']  
  
  agendamento : Agendamentos = new Agendamentos();

  dadosGrid : Agendamentos[];
  
  

  constructor(
              private dialofRef : MatDialogRef<AgendamentosCreateComponent>,
              ) { }

  ngOnInit(): void {
  this.bucarAgendamentos()
  
  }

  NovoAgendamento(){
    
    let teste = this.agendamento;
    
    alert("Teste de cadastro");
  }

  buscarProtocolo(){
    alert(this.agendamento.protocoloid != null ? "Busca de Protocolo" + this.agendamento.protocoloid : "Informe o Protocolo");
  }

  buscarPessoa(){
    alert("Busca de Pessoa" + this.agendamento.nome);
  }

  bucarAgendamentos(){
    
    Agendamentos
    
   
    this.dadosGrid.map(x => (x.id = 1))
  }


  fecharPopup(){
    
      this.dialofRef.close();
  }
}