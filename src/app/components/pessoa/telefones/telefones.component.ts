import { Component, OnInit, Input } from '@angular/core';
import { TripOriginSharp } from '@material-ui/icons';
import { Telefone } from 'src/app/models/Telefone/telefoneModel';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html'
})
export class TelefonesComponent implements OnInit {
 @Input() idContato : number
 @Input() enable : boolean

 selected : number = 0;
  telefones : Telefone[] = []
  tipoTelefone : any[]
  ddd : any[]

  telefone: Telefone = new Telefone()

  displayedColumns = ['ddd', 'numTelefone','ramal','observacao','tipoTelefone','action'] 

  constructor(
              private servico : UtilService,  
              private servicoTelefone : ServiceAllService<Telefone>
              ) { }

  ngOnInit(): void {
    this.carregaCombos()
    this.atualizarGrid();
  }
  
  Salvar(){
    // if (this.ValidarDadosTelefone())
    // {
    //   this.telefone.id = 0;  
    //   this.telefone.dtCriacao = new Date;
    //   let telefone = this.telefone.numTelefone.toString()
    //   this.telefone.numTelefone = telefone
    //   this.telefone.contatoId = this.idContato;
    //   this.telefone.criadoPor = this.servico.Sessao().usuarioId;
    //   Number(this.telefone.tipoTelefone) 
    //   this.telefone.bloqueado = false;
      
    //       this.servicoTelefone.create(this.telefone, Endpoint.Telefone).subscribe(x => 
    //       { 
    //         this.servico.showMessage("Telefone Adicionado",false) 
    //         this.telefone = new Telefone()
    //         this.atualizarGrid();
    //       })
    // }
  }

  RemoveTelefone(id : number){
    this.servicoTelefone.delete(id, Endpoint.Telefone).subscribe(() => {
      this.atualizarGrid()
    })
  }

  carregaCombos(){
    this.tipoTelefone = this.servico.TipoTelefone();
    this.ddd = this.servico.Ddds();
  }

  atualizarGrid(){  
    this.servicoTelefone.read(Endpoint.Telefone).subscribe(x => {
      x.forEach(t => {
        t.tipoTelefone = 
                          t.tipoTelefone == "1" ? "Residencial"
                            : t.tipoTelefone == "2" ? "Celular"
                              : t.tipoTelefone == "3" ? "Comercial" : "";
      });
      this.telefones = x.filter(x => x.contatoId == this.idContato)
    })
  }

  ValidarDadosTelefone() : Boolean {
    let status = false;
      this.telefone.ddd == null || this.telefone.tipoTelefone == null || this.telefone.numTelefone == null ?  this.servico.showMessage("Informar o Telefone", false )
      :  this.telefone.ddd == null || Number(this.telefone.ddd) == 0  ?  this.servico.showMessage("Informe o DDD", false )
      :  this.telefone.tipoTelefone == null || Number(this.telefone.tipoTelefone) == 0 ?  this.servico.showMessage("Informe o tipo deTelefone", false )
      :  this.telefone.numTelefone == null ?  this.servico.showMessage("Informe o número do Telefone", false )
      :  status = true;
      return status
  }

  selecionaLinha(id : any){
    this.selected = id
  }
}
