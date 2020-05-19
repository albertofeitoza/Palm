import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductReadTableprodutosDataSource, ProductReadTableprodutosItem } from './product-read-tableprodutos-datasource';

@Component({
  selector: 'app-product-read-tableprodutos',
  templateUrl: './product-read-tableprodutos.component.html',
  styleUrls: ['./product-read-tableprodutos.component.css']
})
export class ProductReadTableprodutosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductReadTableprodutosItem>;
  dataSource: ProductReadTableprodutosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ProductReadTableprodutosDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
