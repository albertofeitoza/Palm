import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { ProdutoEmpresa } from '../../../models/produtos/produtoEmpresa.model';
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
 comboEmpresa : Empresa;

 produtoEmpresa: ProdutoEmpresa = new ProdutoEmpresa();

  constructor(
              private servico : UtilService,
              private router : Router,
              private ProdutoEmpresaservice : ServiceAllService<ProdutoEmpresa>,
              private ServiceEmpresa : ServiceAllService<Empresa>,
              public matDialogref : MatDialogRef<ProductCreateComponent>,
              private serviceProduto : ServiceAllService<Produto>
               ) { }

  ngOnInit(): void {
    this.buscarProduto();
    this.buscarEmpresa()
  }

  associarProdutoEmpresa() : void {

    this.produtoEmpresa.criadoPor  = Number(this.servico.Sessao().usuarioId);
    this.produtoEmpresa.dtCriacao = new Date;
    this.produtoEmpresa.bloqueado = false;
    this.produtoEmpresa.nome = this.comboProduto.filter(x => x.Id == this.produtoEmpresa.produtoid).map(x => x.Nome).toString().trim();

    this.ProdutoEmpresaservice.read(Endpoint.ProdutoEmpresa).subscribe(p => {
      p = p;

      let ativo = p.filter(x => x.produtoid == this.produtoEmpresa.produtoid && x.empresaid == this.produtoEmpresa.empresaid)
      
      if (ativo.length == 0)
      {
        this.ProdutoEmpresaservice.create(this.produtoEmpresa, Endpoint.ProdutoEmpresa).subscribe(() => {
          this.servico.showMessage('o Produto Criado!');
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
      this.serviceProduto.read(Endpoint.Produto).subscribe(x => {
        this.comboProduto = x;
      })


  }
  buscarEmpresa(){
    this.ServiceEmpresa.read(Endpoint.Empresa).subscribe(emp => {
      this.empresa = emp;
    })
  }
  
}
