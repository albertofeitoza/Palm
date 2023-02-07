import { Component, OnInit, Input } from '@angular/core';
import { cep } from 'src/app/models/CEP/modelBuscaCep';
import { PessoaEndereco } from 'src/app/models/Pessoa/modelPessoaEndereco';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';
import { PessoaUpdateComponent } from 'src/app/components/pessoa/pessoa-update/pessoa-update.component';

@Component({
  selector: 'app-pessoa-endereco',
  templateUrl: './pessoa-endereco.component.html'
})
export class PessoaEnderecoComponent implements OnInit {

 @Input() idPessoa : number;
 @Input() enable : boolean
 @Input() enderecoEnable : boolean = false
  endereco : PessoaEndereco = new PessoaEndereco();
  cep : cep = new cep();

  constructor(private servico : UtilService,
              private servicoCep : ServiceAllService<cep>,
              private servicoEndereco : ServiceAllService<PessoaEndereco>
              
              ) { }

  ngOnInit(): void {
    this.BuscarEndereco()
  }

  BuscarEndereco(){
   
  }
  buscaCep(event : any){
    if(event.which == 13 )
    {
      this.servicoCep.buscarExterna(Endpoint.cep.replace('{0}', this.endereco.cep.toString())).subscribe(ret => {
          if(ret.logradouro != null)
          {
            this.endereco.rua = ret.logradouro
            this.endereco.bairro = ret.bairro
            this.endereco.cidade = ret.localidade
            this.endereco.siglaEstado = ret.uf
          }
          else{
            this.servico.showMessage("Não foi possível encontrar o CEP informado", false) 
          }
      });
    }
  }

  salvar(){
    this.endereco.pessoaId = this.idPessoa;
    this.endereco.dtCriacao = new Date;
    this.endereco.criadoPor = Number(this.servico.Sessao().usuarioId)
    this.endereco.numero = this.endereco.numero.toString()
    this.servicoEndereco.create(this.endereco, Endpoint.PessoaEndereco).subscribe(x => {
      this.servico.showMessage("Endereço adicionado com sucesso", false)
      this.enderecoEnable = true;
    });
  }

}
