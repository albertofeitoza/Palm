import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { Router } from '@angular/router';
import { Endpoint } from './../../../Negocio/Endpoint';
import { ServiceAllService } from './../../../services/service-all.service';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { ProdutoEmpresa } from '../../../models/produtos/produtoEmpresa.model';
import { TipoUsuario } from 'src/app/models/usuarios/enumUsuarios';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {



products: ProdutoEmpresa[]
vlrProduto : string

displayedColumns = ['id','nome', 'valor','bloqueado','action']  

  constructor(private router : Router,
              private serviceProduto : ServiceAllService<ProdutoEmpresa>,
              private serviceEmpresa : ServiceAllService<Empresa>,
              private _utilService : UtilService,
              public dialog : MatDialog, 
              private overlay : Overlay
             ) { }

  ngOnInit(): void {
      this.buscarProduto()
  }

  addProduto(){

    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Master.toString() || this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(ProductCreateComponent, {
          width : '500',
          height : '400px',
          scrollStrategy,

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para criação de empresas",true);
    }


  }

  editarProduto(id : string){
    
    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(ProductUpdateComponent, {
          width : '400px',
          height : '360px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para associar produtos a uma empresa",true);
    }
  }


  excluirProdutoEmpresa(id : string){

    if(this._utilService.Sessao().idGrupoUsuario == TipoUsuario.Administrador.toString())
    {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const dialogRef = this.dialog.open(ProductDeleteComponent, {
          width : '400px',
          height : '240px',
          scrollStrategy,
          id

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }else{
      this._utilService.showMessage("Você não possui permissão para associar produtos a uma empresa",true);
    }


  }


  buscarProduto() {

    this.serviceProduto.read(Endpoint.ProdutoEmpresa).subscribe(product => {
        product = this.vlrProduto == null ?  product : product.filter(x => x.nome.toLowerCase().includes(this.vlrProduto.toLowerCase()))
    })
  }

  selecionarProduto(KeyEvent : any){

    if (KeyEvent.which == 13 || KeyEvent.which == 1){
      this.vlrProduto =  (<HTMLInputElement>document.getElementById('txtbusca')).value;
    
      this.buscarProduto();
    
    }
  }
  
}
