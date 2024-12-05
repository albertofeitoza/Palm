import { Empresa } from '../../../../models/empresa/ModelEmpresa';
import { Endpoint } from '../../../../Negocio/Endpoint';
import { ServiceAllService } from '../../../../services/service-all.service';
import { UtilService } from '../../../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Solucoes } from 'src/app/models/Solucoes/SolucoesEmpresa';


@Component({
  selector: 'app-solucoes-create',
  templateUrl: './solucoes-create.component.html',
  styleUrls: ['./solucoes-create.component.css']
})
export class ProductCreateComponent implements OnInit {

 comboProduto : Solucoes[] ;
 empresa : Empresa[];
 produtoEmpresa: any
  constructor(
              private servico : UtilService,
              private serviceApi : ServiceAllService<any>,
              public matDialogref : MatDialogRef<ProductCreateComponent>,
               ) { }

  ngOnInit(): void {
    this.buscarProduto();
    this.buscarEmpresa()
  }

  associarProdutoEmpresa() : void {

    // this.produtoEmpresa.criadoPor  = Number(this.servico.Sessao().usuarioId);
    // this.produtoEmpresa.dtCriacao = new Date;
    // this.produtoEmpresa.bloqueado = false;
    // this.produtoEmpresa.nome = this.comboProduto.filter(x => x.Id == this.produtoEmpresa.produtoid).map(x => x.Nome).toString().trim();
    // this.produtoEmpresa.nomeEmpresa = this.empresa.filter(x => x.id == Number(this.produtoEmpresa.empresaid)).map(x => x.nomeFantasia).toString();

    // this.ProdutoEmpresaservice.read(Endpoint.ProdutoEmpresa).subscribe(p => {
    //   let ativo = p.filter(x => x.produtoid == this.produtoEmpresa.produtoid && x.empresaid == this.produtoEmpresa.empresaid)
    //   if (ativo.length == 0)
    //   {
    //     this.ProdutoEmpresaservice.create(this.produtoEmpresa, Endpoint.ProdutoEmpresa).subscribe(() => {
    //       this.servico.showMessage(' Produto Criado!');
    //       })
    //   }else{
    //     this.servico.showMessage('Já existe o cadastrado desse produto para essa empresa!');
    //   }
    // })
  }

  fecharPopup() : void {
    this.matDialogref.close();
  }

  buscarProduto(){
    debugger  
    this.serviceApi.read(Endpoint.CatalogoServico).subscribe(x => {
        this.comboProduto = x;
      })


  }
  buscarEmpresa(){
    this.serviceApi.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
