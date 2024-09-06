import { UtilService } from '../../services/util.service';
import { TipoUsuario } from '../../models/usuarios/enumUsuarios';
import { Endpoint } from '../../Negocio/Endpoint';
import { ServiceAllService } from '../../services/service-all.service';
import { HeaderService } from '../template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoEmpresa } from 'src/app/models/produtos/produtoEmpresa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 produtos : ProdutoEmpresa[];


  constructor(private serviceProdutos : ServiceAllService<ProdutoEmpresa>,
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

    this.serviceProdutos.read(Endpoint.ProdutoEmpresa).subscribe(prod => {
     
      this.produtos = prod;
  
    });
  }
}
