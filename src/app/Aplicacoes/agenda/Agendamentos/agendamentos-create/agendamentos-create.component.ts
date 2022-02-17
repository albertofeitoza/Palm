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

  agendamento : Agendamentos = new Agendamentos();

  constructor(
              private dialofRef : MatDialogRef<AgendamentosCreateComponent>,
              ) { }

  ngOnInit(): void {
  }

  NovoAgendamento(){
    
    let teste = this.agendamento;
    
    alert("Teste de cadastro");
  }

  fecharPopup(){
    
      this.dialofRef.close();
  }
}