import { UtilService } from './../../services/util.service';
import { TipoUsuario } from './../../models/usuarios/enumUsuarios';
import { Endpoint } from './../../Negocio/Endpoint';
import { ServiceAllService } from './../../services/service-all.service';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/produtos/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 produtos : Product[];


  constructor(private serviceProdutos : ServiceAllService<Product>,
              private headerService : HeaderService,
              private utilService : UtilService
              ) 
              {
               // this.headerService.headerData = {
               //  title : 'Início',
              //    icon : 'home',
              //    routeUrl : ''
               // }
              }

  ngOnInit(): void {
    this.ObterComponentes();
    this.utilService.AtualizarMenu("Início","home",'');
  }
  
  
  ObterComponentes(){

    this.serviceProdutos.read(Endpoint.Produto).subscribe(prod => {
     
      this.produtos = prod;
  
    });
  }
}
