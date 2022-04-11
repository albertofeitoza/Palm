import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Product } from '../../../models/produtos/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoAplicacao } from 'src/app/Negocio/Aplicacao';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  comboProduto =  [];
  @Input() empresa! : Empresa[];
  @Input() comboEmpresa! : Empresa;

  @Input() product!: Product

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

      let ativo = p.filter(x => x.nome == this.product.nome)
      
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
        //this.comboProduto.push(element)
      });
     return this.comboProduto;
  }
  buscarEmpresa(){
    this.ServiceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
