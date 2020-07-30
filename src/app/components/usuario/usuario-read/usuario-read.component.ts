import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from '../../../models/modelLogin';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {
  usuario: Usuario[]
  empresa: Empresa
  displayedColumns = ['id','nome','email','telefone','login', 'senha', 'empresaId','action']  


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UsuarioReadComponent>;
  dataSource: UsuarioReadComponent;


  
  constructor(private usuarioService: UsuarioService,
              private empresaService: EmpresaService
             ) 
             { }

  ngOnInit(): void {
    this.usuarioService.read().subscribe(usuario => {
      this.usuario = usuario;
      

      usuario.forEach(element => {
        
        this.empresaService.readById(element.empresaId).subscribe(empresa => {
          this.empresa = empresa;
          element.empresaId  = this.empresa.razaoSocial;
          element.senha = '******';
          element.passwordTemp = '******'

        });
        

      });
      
    
    })
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource = this.dataSource;
  }
}
