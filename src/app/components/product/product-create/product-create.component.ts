import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Aplicacao, TipoAplicacao } from './../../../Negocio/Aplicacao';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { Usuario } from './../../../models/usuarios/modelLogin';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from 'querystring';
import { UtilService } from './../../../services/util.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  comboProduto =  [];
  empresa : Empresa[];
  comboEmpresa : Empresa;

    product : Product = {  
    dtCriacao : null,
    criadoPor : null,
    nome : null,
    valor : 0,
    empresaid : null,
    bloqueado : false,
    }

  constructor(
              private utilService : UtilService,
              private router : Router,
              private ProdutoEmpresa : ServiceAllService<Product>,
              private ServiceEmpresa : ServiceAllService<Empresa>,
              public matDialogref : MatDialogRef<ProductCreateComponent>
               ) { }

  ngOnInit(): void {
    this.buscarProduto();
    this.buscarEmpresa()
  }

  associarProdutoEmpresa() : void {

    this.product.criadoPor  = Number(localStorage.getItem("usId"));
    this.product.dtCriacao = new Date;
    this.product.bloqueado = false;
    
    this.ProdutoEmpresa.read(Endpoint.Produto).subscribe(p => {
      p = p;

      let ativo = p.filter(x => x.nome == this.product.nome && x.empresaid == this.product.empresaid )
      
      if (ativo.length == 0)
      {
        this.ProdutoEmpresa.create(this.product, Endpoint.Produto).subscribe(() => {
          this.utilService.showMessage('o Produto Criado!');
          this.utilService.atualizaRota("products")
          })
      
      }else{
        this.utilService.showMessage('Esse Produto Já foi cadastrado para essa empresa!');
      }

    })
    
  }

  fecharPopup() : void {
    this.matDialogref.close();
  }

  buscarProduto(){
    
      TipoAplicacao.forEach(element => {
        this.comboProduto.push(element)
      });
     return this.comboProduto;
  }
  buscarEmpresa(){
    this.ServiceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
