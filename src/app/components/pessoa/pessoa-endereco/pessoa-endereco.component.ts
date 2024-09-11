import { Component, OnInit, Input } from '@angular/core';
import { cep } from 'src/app/models/CEP/modelBuscaCep';
import { PessoaEndereco } from 'src/app/models/Pessoa/modelPessoaEndereco';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pessoa-endereco',
  templateUrl: './pessoa-endereco.component.html'
})
export class PessoaEnderecoComponent implements OnInit {

 @Input() idPessoa : number;
 @Input() enable : boolean
 @Input() enderecoEnable : boolean = false
 @Input() disableForm : boolean = false;
  
 endereco : PessoaEndereco = new PessoaEndereco();
 cep : cep = new cep();

  constructor(private servico : UtilService,
              private servicoCep : ServiceAllService<cep>,
              private servicoEndereco : ServiceAllService<PessoaEndereco>,
              ) { }

  ngOnInit(): void {
    this.BuscarEndereco()
  }

  BuscarEndereco(){
   this.servicoEndereco.read(Endpoint.PessoaEndereco).subscribe(x => {
    let endereco =  x.filter(x => x.pessoaId == this.idPessoa)[0];
    endereco.cep = Number(endereco.cep)
    this.endereco = endereco
      this.enderecoEnable = true;
   })
  }

  BuscarTelefones(){

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
            this.disableForm = true;
          }
          else{
            this.servico.showMessage("Não foi possível encontrar o CEP informado", false) 
            this.disableForm = false;
          }
      });
    }
  }

  salvar(){
  //   this.endereco.pessoaId = this.idPessoa;
  //   this.endereco.dtCriacao = new Date;
  //   this.endereco.criadoPor = Number(this.servico.Sessao().usuarioId)
  //   this.endereco.numero = this.endereco.numero.toString()

  //   if(this.endereco.id == null)
  //   {
      
  //     this.servicoEndereco.create(this.endereco, Endpoint.PessoaEndereco).subscribe(x => {
  //       this.servico.showMessage("Endereço adicionado com sucesso", false)
  //       this.enderecoEnable = true;
  //     });


  //   }else
  //   {
  //     this.servicoEndereco.update(this.endereco, Endpoint.PessoaEndereco).subscribe(x => {
  //       this.servico.showMessage("Endereço Atualizado com sucesso", false)
  //       this.enderecoEnable = true;
  //     });
  //   }
   }
}
