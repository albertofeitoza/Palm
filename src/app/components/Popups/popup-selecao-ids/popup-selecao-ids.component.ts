import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CatalogoServico } from 'src/app/models/CatalogoServico/CatalogoServico';
import { PopupSelecaoIds } from 'src/app/models/Popups/popupSelecaoIds';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-popup-selecao-ids',
  templateUrl: './popup-selecao-ids.component.html'
})
export class PopupSelecaoIdsComponent implements OnInit {

  constructor(
    private servico: UtilService,
    private dialofRef: MatDialogRef<PopupSelecaoIdsComponent>,
    private serviceApi: ServiceAllService<any>

  ) { }


  displayedColumns = ['check', 'id', 'nome', 'codigo']
  dadosGrid: CatalogoServico[] = new Array()
  selecionaTodos = false;
  linhaSelecionada = 0;
  // teste: PopupSelecaoIds
  // selected: number = 0;



  // id:           number;
  // dtCriacao:    Date;
  // codigoBarras: string;
  // qrCode:       string;
  // codigo:       string;
  // qtdEstoque:   number;
  // nome:         string;
  // tipoCatalogo: number;
  // peso:         number;
  // margem:       number;
  // valorCompra:  number;
  // valor:        number;
  // excluido:     boolean;
  // empresaId:    number;





  ngOnInit(): void {


    // this.teste = new PopupSelecaoIds()

    // this.teste.check = false;
    // this.teste.Id = 1;
    // this.teste.Nome = 'Alberto',
    //   this.teste.Codigo = "ALB";

    // this.dadosGrid.push(this.teste);

    // this.teste = new PopupSelecaoIds()

    // this.teste.check = false;
    // this.teste.Id = 2;
    // this.teste.Nome = 'Kelly',
    //   this.teste.Codigo = "KEL";


    this.BuscarProdutosServicos();
    // this.dadosGrid.push(this.teste);
  }
  private BuscarProdutosServicos(): void {


    this.serviceApi.read(Endpoint.CatalogoServico + `/estabelecimento/${this.servico.Sessao().EmpresaId}/${0}`)
      .subscribe((result: CatalogoServico[]) => {
        this.dadosGrid = result
      });
  }

  Adicionar() {
    this.dialofRef.close(this.dadosGrid.filter(x => x.check));
  }

  selecionaLinha(id: any) {

  }

  fecharPopup() {

    this.dialofRef.close();
  }

  public SelecionarTodos(): void {

    if (!this.selecionaTodos) {
      this.dadosGrid.forEach(x => {
        x.check = true;
      });
      this.selecionaTodos = true;

    } else {
      this.dadosGrid.forEach(x => {
        x.check = false;
      });
      this.selecionaTodos = false;
    }
  }


  public SelecionarItem(item: CatalogoServico): void {

    this.dadosGrid.forEach(it => {

      if (it.id === item.id)
        it.check = it.check ? false : true;

    });
  }



}
