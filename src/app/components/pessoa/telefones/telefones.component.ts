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

  selecionaLinha(id : any)
  {

  }
  Salvar(){

    this.telefone.contatoId = this.idContato;
    this.telefone.dtCriacao = new Date;
    this.telefone.criadoPor = this.servico.Sessao().usuarioId;
    this.servicoTelefone.create(this.telefone, Endpoint.Telefone).subscribe(x => 
    { 
      this.servico.showMessage("Telefone Adicionado",false) 
    })

  }

  RemoveTelefone(row : any){

  }

  carregaCombos(){
    this.tipoTelefone = this.servico.TipoTelefone();
    this.ddd = this.servico.Ddds();
  }

  atualizarGrid(){  
    // let newList = this.telefones.slice()
    // this.telefones = newList
    this.servicoTelefone.read(Endpoint.Telefone).subscribe(x => {
      this.telefones = x.filter(x => x.contatoId == this.idContato)
    })


  }
  
}
