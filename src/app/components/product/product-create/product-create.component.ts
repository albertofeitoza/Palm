import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { ProdutoEmpresa } from '../../../models/produtos/produtoEmpresa.model';
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

 comboProduto : ProdutoEmpresa[] ;
 empresa : Empresa[];
 comboEmpresa : Empresa;

  product: ProdutoEmpresa

  constructor(
              private servico : UtilService,
              private router : Router,
              private ProdutoEmpresa : ServiceAllService<ProdutoEmpresa>,
              private ServiceEmpresa : ServiceAllService<Empresa>,
              public matDialogref : MatDialogRef<ProductCreateComponent>
               ) { }

  ngOnInit(): void {
    this.buscarProduto();
    this.buscarEmpresa()
  }

  associarProdutoEmpresa() : void {

    this.product.criadoPor  = 1
    this.product.dtCriacao = new Date;
    this.product.bloqueado = false;
    
    this.ProdutoEmpresa.read(Endpoint.ProdutoEmpresa).subscribe(p => {
      p = p;

      let ativo = p.filter(x => x.nome == this.product.nome)
      
      if (ativo.length == 0)
      {
        this.ProdutoEmpresa.create(this.product, Endpoint.ProdutoEmpresa).subscribe(() => {
          this.servico.showMessage('o Produto Criado!');
          this.servico.atualizaRota("produtoempresa")
          })
      
      }else{
        this.servico.showMessage('Esse Produto Já foi cadastrado para essa empresa!');
      }

    })
    
  }

  fecharPopup() : void {
    this.matDialogref.close();
  }

  buscarProduto(){
    
    


  }
  buscarEmpresa(){
    this.ServiceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
