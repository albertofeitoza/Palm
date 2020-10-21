import { Usuario } from 'src/app/models/modelLogin';
import { ServiceAllService } from './../../../services/service-all.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from './../../../models/empresa/ModelEmpresa';
import { EmpresaService } from './../../../services/empresa.service';
import { UsuarioService } from './../../../services/usuario.service';
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
              private empresaService: EmpresaService,
              private usuarioRead : ServiceAllService<Usuario>
             ) 
             { }

  ngOnInit(): void {
    
    const tipo = `${"Usuario"}`
    this.usuarioRead.read(tipo).subscribe(usuario => {
      this.usuario = usuario;
      
      usuario.forEach(element => {
        const tipo = `${"Usuario"}`
        this.usuarioRead.readById(element.EmpresaId, tipo ).subscribe(empresa => {
          this.empresa = this.empresa;
          element.EmpresaId  = this.empresa.razaoSocial;
          element.Senha = '******';
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
