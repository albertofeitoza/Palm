import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { PopupSelecaoIds } from 'src/app/models/Popups/popupSelecaoIds';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-popup-selecao-ids',
  templateUrl: './popup-selecao-ids.component.html',
  styleUrls: ['./popup-selecao-ids.component.css']
})
export class PopupSelecaoIdsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dadosGrid = new MatTableDataSource<CatalogoServico>();

  constructor(
    private servico: UtilService,
    private dialofRef: MatDialogRef<PopupSelecaoIdsComponent>,
    private serviceApi: ServiceAllService<any>

  ) { }


  displayedColumns = ['check', 'id', 'nome', 'codigo']
  //dadosGrid: CatalogoServico[] = new Array()
  selecionaTodos = false;
  linhaSelecionada = 0;
  campoBusca: any = undefined;


  ngOnInit(): void {
    let busca = this.dialofRef._containerInstance._config.data.object;
    this.BuscarProdutosServicos(busca?.codServico);
  }

  private BuscarProdutosServicos(txtbusca: any = undefined): void {

    this.serviceApi.read(Endpoint.CatalogoServico + `/estabelecimento/${this.servico.Sessao().EmpresaId}/${0}`)
      .subscribe((result: CatalogoServico[]) => {
        this.dadosGrid.data = txtbusca ? result.filter(res => res.codigo.toLocaleLowerCase().includes(txtbusca.toLocaleLowerCase())) : result;
        this.campoBusca = undefined

        this.dadosGrid.paginator = this.paginator
        this.dadosGrid.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Itens por página";

      });
  }

  Adicionar() {
    this.dialofRef.close(this.dadosGrid.data.filter(x => x.check));
  }

  public BuscarPor(event: any): void {
    if (event.which === 13 || event.which === 1) {
      this.BuscarProdutosServicos(this.campoBusca);
      this.campoBusca = undefined;
    }
  }


  selecionaLinha(id: any) {

  }

  fecharPopup() {

    this.dialofRef.close();
  }

  public SelecionarTodos(): void {

    if (!this.selecionaTodos) {
      this.dadosGrid.data.forEach(x => {
        x.check = true;
      });
      this.selecionaTodos = true;

    } else {
      this.dadosGrid.data.forEach(x => {
        x.check = false;
      });
      this.selecionaTodos = false;
    }
  }


  public SelecionarItem(item: CatalogoServico): void {

    this.dadosGrid.data.forEach(it => {

      if (it.id === item.id)
        it.check = it.check ? false : true;

    });
  }



}
