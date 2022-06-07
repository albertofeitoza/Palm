import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Empresa } from 'src/app/models/empresa/ModelEmpresa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { AgendamentosCreateComponent } from '../agendamentos-create/agendamentos-create.component';

@Component({
  selector: 'app-agendamentos-read',
  templateUrl: './agendamentos-read.component.html',
  styleUrls: ['./agendamentos-read.component.css']
})
export class AgendamentosReadComponent implements OnInit {

  
  displayedColumns = ['id','horaAgendada','nome','responsavel','cpf','rg','dataNascimento',
  'telefone','celular','email','Agendaid','Protocoloid','StatusAgendamento','action']  
  
  agendamentos : Agendamentos[]
 
  selected : Number = 0;
  
  constructor(
              private servicoAgendamento : ServiceAllService<Agendamentos>,
              private servico : UtilService
              ) { }

  ngOnInit(): void {
    this.buscarAgendamento();
  
  }

  buscarAgendamento(){

      this.servicoAgendamento.read(Endpoint.Agendamentos).subscribe(a => {
        this.agendamentos = a;
      })

  }
  
  EditarAgendamento(id : any){

  }


  ExcluirAgendamento(id : any){

  }

  NovoAgendamento(){
    this.servico.Popup("", AgendamentosCreateComponent, '70%', '80%');
  }

  selecionaLinha(id : Number){
    this.selected = id;
  }
}
