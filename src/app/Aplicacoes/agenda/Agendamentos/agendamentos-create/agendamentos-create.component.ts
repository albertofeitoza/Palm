import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Agendamentos } from 'src/app/models/Agenda/modelAgendamentos';
import { Pessoa } from 'src/app/models/Pessoa/modelPessoa';
import { PessoaGrid } from 'src/app/models/Pessoa/modelPessoaGrid';
import { Usuario } from 'src/app/models/usuarios/modelLogin';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';

@Component({
  selector: 'app-agendamentos-create',
  templateUrl: './agendamentos-create.component.html',
  styleUrls: ['./agendamentos-create.component.css']
  
})
export class AgendamentosCreateComponent implements OnInit {

  colunas = ['id','nome','protocolos','grupoAgenda','agendamentoFuturo','responsavel','ura','cpf','rg','telefone','celular']  
  
 @Input() pessoa!: Pessoa
 @Input() pessoaGrid!: PessoaGrid[];
  
  

  constructor(
              private dialofRef : MatDialogRef<AgendamentosCreateComponent>,
              private servicoPessoa : ServiceAllService<PessoaGrid>

              ) { }

  ngOnInit(): void {
  this.bucarAgendamentos()
  
  }

  NovoAgendamento(){
    alert("Teste de cadastro");
  }

  buscarProtocolo(){
    
  }

  buscarPessoa(){
  
    this.servicoPessoa.read(Endpoint.Pessoa).subscribe(p => {
      this.pessoaGrid = p.filter(x => this.pessoa.nome != null 
                                ? x.nome.toLowerCase().includes(this.pessoa.nome.toLowerCase()) 
                                : this.pessoa.responsavel != null 
                                ? x.responsavel.toLowerCase().includes(this.pessoa.responsavel.toLowerCase()) 
                                : this.pessoa.rg != null  
                                ? x.rg.toLowerCase().includes(this.pessoa.rg.toLowerCase()) 
                                : this.pessoa.cpf != null 
                                ? x.cpf.toLowerCase().includes(this.pessoa.cpf.toLowerCase()) 
                                : p);
    });
  
  }

  bucarAgendamentos(){
    
 
  }


  fecharPopup(){
    
      this.dialofRef.close();
  }


  selecionarPessoa(id : any){
    alert("Teste de click " + id);
  }

  AgendarOrcar(){
    alert(this.pessoa.nome)
  }
 
}