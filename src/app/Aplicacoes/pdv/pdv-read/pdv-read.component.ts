import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pdv-read',
  templateUrl: './pdv-read.component.html',
  styleUrls: ['./pdv-read.component.css']
})
export class PdvReadComponent implements OnInit {



  usuario = 0;
  tipoUsuario = 0;
  codBarras: any
  id = 0;
  alterar = false;
  produto: any = {
    Id: 0,
    Produto: 'Produto1',
    Quant: 1,
    ValorUnitario: '2,55',
    valor: '2,55',
  }

  dados: any[] = [
    {
      Id: 1,
      Produto: 'Produto1',
      Quant: 1,
      ValorUnitario: '2,55',
      valor: '2,55',
    },
    {
      Id: 2,
      Produto: 'Produto2',
      Quant: 2,
      ValorUnitario: '2,55',
      valor: '5,10',
    }
  ];


  constructor(
    private servico: UtilService
  ) { }

  ngOnInit(): void {
    let sessao = this.servico.Sessao();
    this.usuario = sessao.IdUsuario;
    this.tipoUsuario = sessao.TipoUsuarioLogado;
    this.id = this.dados.length;
  }


  public ConsultaVendas(): void {
    throw new Error('Method not implemented.');
  }

  public AbrirCaixa(): void {
    throw new Error('Method not implemented.');
  }

  public CadastroProdutos(): void {
    throw new Error('Method not implemented.');
  }


  public BuscarProduto(event: any): void {

    if (event.which === 1 || event.which === 13) {
      let ok = this.codBarras;

      this.codBarras = undefined

      this.id = this.dados.length + 1
      this.produto.Id = this.id;
      this.id = 0

      this.produto = this.produto


      this.dados.push(this.produto)

    }

    this.alterar = true;

  }

}
