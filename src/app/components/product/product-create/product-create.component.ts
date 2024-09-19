import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoAplicacao } from 'src/app/Negocio/Aplicacao';
import { Produto } from 'src/app/models/produtos/Produto';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

 comboProduto : Produto[] ;
 empresa : Empresa[];
 produtoEmpresa: any
  constructor(
              private servico : UtilService,
              private ProdutoEmpresaservice : ServiceAllService<any>,
              private ServiceEmpresa : ServiceAllService<Empresa>,
              public matDialogref : MatDialogRef<ProductCreateComponent>,
              private serviceProduto : ServiceAllService<Produto>
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
    this.serviceProduto.read(Endpoint.CatalogoServico).subscribe(x => {
        this.comboProduto = x;
      })


  }
  buscarEmpresa(){
    this.ServiceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
