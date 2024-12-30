import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupConfirmacaoComponent } from 'src/app/components/Popups/popup-confirmacao/popup-confirmacao.component';
import { ViewEmpresas } from 'src/app/models/empresa/ModelEmpresa';
import { Solucoes } from 'src/app/models/Solucoes/Solucoes';
import { SolucoesEmpresa } from 'src/app/models/Solucoes/SolucoesEmpresa';
import { Endpoint } from 'src/app/Negocio/Endpoint';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-associarsolucaoempresa',
  templateUrl: './associarsolucaoempresa.component.html',
  styleUrls: ['./associarsolucaoempresa.component.css']
})
export class AssociarsolucaoempresaComponent implements OnInit {

  displayedColumns = ['id', 'razaoSocial', 'cpfCnpj', 'action'];

  dadosSolucao: Solucoes = new Solucoes();
  solucoesEmpresa: ViewEmpresas[] = new Array();
  empresasNaoCadastradas: ViewEmpresas[] = new Array();
  empresaId = 0;

  constructor(
    private dialogRef: MatDialogRef<AssociarsolucaoempresaComponent>,
    private servico: UtilService,
    private serviceApi: ServiceAllService<any>
  ) { }

  ngOnInit(): void {
    this.dadosSolucao = this.dialogRef._containerInstance._config.data.object;
    this.BuscarEmpresasXSolucoes();
  }

  public FecharPopup(): void {
    this.dialogRef.close();
  }

  private CarregaCombo(): void {
    this.serviceApi.read(Endpoint.Empresa + `/estabelecimento/${0}`)
      .subscribe((result: ViewEmpresas[]) => {

        this.empresasNaoCadastradas = new Array();

        result.forEach(emp => {
          if (this.solucoesEmpresa.filter(x => x.id === emp.id).length === 0) {
            this.empresasNaoCadastradas.push(emp);
          }
        });
      });
  }


  public BuscarEmpresasXSolucoes(): void {
    this.serviceApi.read(Endpoint.Empresa + `/buscarPorSolucao/${this.dadosSolucao.id}`)
      .subscribe((result: ViewEmpresas[]) => {
        this.solucoesEmpresa = result;
        this.CarregaCombo();
      })
  }

  public AdicionarEmpresa(): void {

    if (this.empresaId === 0)
      return this.servico.showMessage("Selecionar uma empresa, para adicionar.", true)

    this.servico.Popup('', PopupConfirmacaoComponent, '35%', '15%', false, 'Tem Certeza que quer adicionar a empresa? Após adicionar a empresa será Faturada.')
      .subscribe(result => {
        if (result) {

          const cadastrarSolucao: SolucoesEmpresa = new SolucoesEmpresa();

          cadastrarSolucao.solucaoId = this.dadosSolucao.id;
          cadastrarSolucao.solucaoNome = this.dadosSolucao.nome
          cadastrarSolucao.solucaoRota = this.dadosSolucao.rota
          cadastrarSolucao.empresaId = this.empresaId;
          cadastrarSolucao.ativo = true;

          //cadastrar no  faturamento..
          this.serviceApi.create(cadastrarSolucao, Endpoint.SolucoesEmpresa)
            .subscribe(() => {
              this.BuscarEmpresasXSolucoes();
            })
        }
      });


  }

  public BuscarEmpresaCadastrada(event: any): void {
    if (event.witch === 13 || event.witch === 1) {
      alert('ok');
    }
  }

  public ExcluirSolucaoParaEmpresa(row: ViewEmpresas): void {
    this.servico.Popup('', PopupConfirmacaoComponent, '35%', '15%', false, 'Tem Certeza ? Ao Excluir a empresa não consegue mais acessar a solução.')
      .subscribe(result => {
        if (result) {

          //alterar no  faturamento..
          this.serviceApi.create(result, Endpoint.SolucoesEmpresa + `/buscarPorSolucaoEmpresa/${this.dadosSolucao.id}/${row.id}` )
            .subscribe((result : SolucoesEmpresa) => {
              this.serviceApi.create(result, Endpoint.SolucoesEmpresa + `/excluir/${result.id}` )
              .subscribe(() => {
                this.BuscarEmpresasXSolucoes();
              })
            })
        }
      });
  }

}
